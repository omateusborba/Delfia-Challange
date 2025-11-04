// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

/// @title GoDigital Registry (MVP)
/// @notice Pass de acesso (soulbound lógico), trilha de auditoria e validação simples de transações.
/// @dev Protótipo educacional. Não usar em produção sem auditoria.

contract GoDigitalRegistry {
    // -------- Roles --------
    address public admin;
    mapping(address => bool) public issuers;    // quem pode emitir/revogar passes
    mapping(address => bool) public operators;  // quem pode auditar/validar

    error NotAdmin();
    error NotIssuer();
    error NotOperator();

    modifier onlyAdmin() { if (msg.sender != admin) revert NotAdmin(); _; }
    modifier onlyIssuer() { if (!issuers[msg.sender]) revert NotIssuer(); _; }
    modifier onlyOperator() { if (!operators[msg.sender]) revert NotOperator(); _; }

    event RoleChanged(string indexed role, address indexed account, bool enabled);
    event AdminChanged(address indexed previousAdmin, address indexed newAdmin);

    constructor() {
        admin = msg.sender;
        issuers[msg.sender] = true;
        operators[msg.sender] = true;
        emit RoleChanged("ISSUER", msg.sender, true);
        emit RoleChanged("OPERATOR", msg.sender, true);
    }

    /// @notice Troca o admin.
    function changeAdmin(address newAdmin) external onlyAdmin {
        require(newAdmin != address(0), "addr=0");
        address prev = admin;
        admin = newAdmin;
        emit AdminChanged(prev, newAdmin);
    }

    /// @notice Liga/desliga permissao de emissor.
    function setIssuer(address who, bool enabled) external onlyAdmin {
        require(who != address(0), "addr=0");
        if (issuers[who] == enabled) return; // evita re-store
        issuers[who] = enabled;
        emit RoleChanged("ISSUER", who, enabled);
    }

    /// @notice Liga/desliga permissao de operador.
    function setOperator(address who, bool enabled) external onlyAdmin {
        require(who != address(0), "addr=0");
        if (operators[who] == enabled) return; // evita re-store
        operators[who] = enabled;
        emit RoleChanged("OPERATOR", who, enabled);
    }

    // -------- Pass --------
    struct Pass { bool active; uint8 level; uint64 expiresAt; }
    mapping(address => Pass) public passes;

    event PassIssued(address indexed to, uint8 level, uint64 expiresAt);
    event PassRevoked(address indexed who);

    function issuePass(address to, uint8 level, uint64 expiresAt) external onlyIssuer {
        require(to != address(0), "addr=0");
        passes[to] = Pass(true, level, expiresAt);
        emit PassIssued(to, level, expiresAt);
    }

    function revokePass(address who) external onlyIssuer {
        require(passes[who].active, "no-active-pass");
        passes[who].active = false;
        emit PassRevoked(who);
    }

    /// @notice Checa se o usuário tem pass válido com nível mínimo.
    function hasValidPass(address who, uint8 minLevel) public view returns (bool) {
        Pass storage p = passes[who]; // storage ref (mais barato que copiar pra memory)
        if (!p.active) return false;
        if (p.level < minLevel) return false;
        if (p.expiresAt != 0 && block.timestamp > p.expiresAt) return false;
        return true;
    }

    // -------- Auditoria --------
    struct AuditEntry {
        uint256 id;
        address actor;
        address subject;
        bytes32 refId;
        string  action;
        uint256 timestamp; // mantemos no estado para leitura via view
    }

    uint256 public auditCounter;
    mapping(uint256 => AuditEntry) public audits;

    event AuditLogged(
        uint256 indexed id,
        address indexed actor,
        address indexed subject,
        bytes32 refId,
        string action
        // sem timestamp no evento (já existe no bloco)
    );

    function logAudit(address subject, bytes32 refId, string calldata action)
        external onlyOperator returns (uint256)
    {
        auditCounter = auditCounter + 1; // micro-otimização vs +=
        audits[auditCounter] = AuditEntry({
            id: auditCounter,
            actor: msg.sender,
            subject: subject,
            refId: refId,
            action: action,
            timestamp: block.timestamp
        });
        emit AuditLogged(auditCounter, msg.sender, subject, refId, action);
        return auditCounter;
    }

    // -------- Validação de transação --------
    enum TxStatus { NONE, APPROVED, REJECTED }
    struct TxRecord {
        TxStatus status;
        address payer;
        uint256 amount;
        bytes32 refId;
        uint256 timestamp; // estado
        string  reason;
    }
    mapping(bytes32 => TxRecord) public txs;

    event TxValidated(
        bytes32 indexed txKey,
        TxStatus status,
        address indexed payer,
        uint256 amount,
        bytes32 refId,
        string reason
        // sem timestamp no evento
    );

    mapping(uint8 => uint256) public limitByLevel;
    uint8 public minLevelForPayment = 1;

    event LimitsUpdated(uint8 indexed level, uint256 limit);
    event MinLevelUpdated(uint8 minLevel);

    function setLimit(uint8 level, uint256 limit) external onlyAdmin {
        if (limitByLevel[level] == limit) return;
        limitByLevel[level] = limit;
        emit LimitsUpdated(level, limit);
    }

    function setMinLevelForPayment(uint8 minLevel) external onlyAdmin {
        if (minLevelForPayment == minLevel) return;
        minLevelForPayment = minLevel;
        emit MinLevelUpdated(minLevel);
    }

    function validateTransaction(bytes32 txKey, address payer, uint256 amount, bytes32 refId)
        external onlyOperator
    {
        require(txs[txKey].status == TxStatus.NONE, "already-processed");
        string memory reason;

        if (!hasValidPass(payer, minLevelForPayment)) {
            reason = "PASS_INVALID_OR_EXPIRED";
            _saveTx(txKey, TxStatus.REJECTED, payer, amount, refId, reason);
            return;
        }

        uint8 lvl = passes[payer].level;
        uint256 limit = limitByLevel[lvl];
        if (limit != 0 && amount > limit) { // != 0 é levemente mais barato que > 0
            reason = "AMOUNT_ABOVE_LEVEL_LIMIT";
            _saveTx(txKey, TxStatus.REJECTED, payer, amount, refId, reason);
            return;
        }

        _saveTx(txKey, TxStatus.APPROVED, payer, amount, refId, "APPROVED");
    }

    function _saveTx(
        bytes32 txKey, TxStatus status, address payer, uint256 amount, bytes32 refId, string memory reason
    ) internal {
        txs[txKey] = TxRecord({
            status: status,
            payer: payer,
            amount: amount,
            refId: refId,
            timestamp: block.timestamp,
            reason: reason
        });
        emit TxValidated(txKey, status, payer, amount, refId, reason);

        // Audita automaticamente a decisão
        auditCounter = auditCounter + 1;
        string memory action = (status == TxStatus.APPROVED) ? "TX_APPROVED" : "TX_REJECTED";
        audits[auditCounter] = AuditEntry({
            id: auditCounter,
            actor: msg.sender,
            subject: payer,
            refId: refId,
            action: action,
            timestamp: block.timestamp
        });
        emit AuditLogged(auditCounter, msg.sender, payer, refId, action);
    }
}
