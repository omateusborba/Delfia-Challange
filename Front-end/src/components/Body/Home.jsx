import mateus from '../img/mateus.jpg';
import tiago from '../img/tiago.jpg';
import pedro from '../img/pedro.jpg';
import rafael from '../img/rafael.jpg';
import igor from '../img/igor.jpg';
import fundo from '../img/fundo.png';
import note from '../img/note.png';
import will from '../img/will.jpg';
import kelly from '../img/kelly.jpg';

export default function Home() {

    return (
        <>
        <header style={{
    position: 'relative',
    backgroundImage: `url(${fundo})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    paddingTop: '8rem',
    paddingBottom: '8rem',
  }}>
            <div className=" position-relative" >
                <div className="col-12 justify-content-center">
                        <div className="text-center text-black">
                            <h1 className="mb-5" style={{color: '#ffff'}}>Mais que um sistema: inteligência para o crescimento do seu negócio</h1>
                        </div>
                </div>
            </div>
        </header>
        <section className="p-5">
                    <div className="container">
                    <div className="row text-center">
                        <div className="col-md-4 mb-4">
                        <div className="shadow border rounded p-4 h-100">
                            <div className="mb-3">
                            <span className="fs-1 text-primary">&#9881;</span>
                            </div>
                            <h4>Controle de estoque</h4>
                            <p>Evita desperdícios, perdas e falta de produtos.</p>
                        </div>
                        </div>
                        <div className="col-md-4 mb-4">
                        <div className="shadow border rounded p-4 h-100">
                            <div className="mb-3">
                            <span className="fs-1 text-success">&#128640;</span>
                            </div>
                            <h4>Gestão financeira integrada</h4>
                            <p>Permite acompanhamento detalhado de receitas e despesas.</p>
                        </div>
                        </div>
                        <div className="col-md-4 mb-4">
                        <div className="shadow border rounded p-4 h-100">
                            <div className="mb-3">
                            <span className="fs-1 text-danger">&#128161;</span>
                            </div>
                            <h4>Organização de pedidos e clientes</h4>
                            <p>Centraliza informações e agiliza o atendimento.</p>
                        </div>
                        </div>
                    </div>
                    </div>
        </section>
        <section className="p-0">
            <div className="container-fluid py-5 px-0">
                <div className="row g-0">
                    <div className="col-lg-6 order-lg-2 text-white " style={{backgroundImage: `url(${note})`, backgroundPosition: 'center center',
    backgroundSize: 'cover',}} ></div>
                    <div className="col-lg-6  my-auto p-5">
                        <h2>IA para gestão de Marketing</h2>
                        <p className="lead mb-0">Análise de dados de vendas anteriores e comportamento dos clientes, identificando padrões de consumo e preferências.
                        Recomendações de estratégias de marketing personalizadas, com base em dados de mercado e perfil do público-alvo.
                        Projeções e estimativas de vendas futuras, considerando variáveis como sazonalidade, tendências do setor e desempenho histórico.
                        Apoio à tomada de decisão estratégica, ajudando a definir quais produtos priorizar, canais de venda mais eficazes e ações promocionais com maior potencial de retorno.
                        </p>
                    </div>
                </div>
                <div className="row g-0">
                    <div className="col-lg-6 text-white" style={{backgroundImage: `url(${kelly})`, backgroundPosition: 'center center',
    backgroundSize: 'cover',}} ></div>
                    <div className="col-lg-6 my-auto p-5">
                        <h2>IA para gestão de Marketing</h2>
                        <p className="lead mb-0">Análise de dados de vendas anteriores e comportamento dos clientes, identificando padrões de consumo e preferências.
                        Recomendações de estratégias de marketing personalizadas, com base em dados de mercado e perfil do público-alvo.
                        Projeções e estimativas de vendas futuras, considerando variáveis como sazonalidade, tendências do setor e desempenho histórico.
                        Apoio à tomada de decisão estratégica, ajudando a definir quais produtos priorizar, canais de venda mais eficazes e ações promocionais com maior potencial de retorno.
                        </p>
                    </div>
                </div>
                <div className="row g-0">
                    <div className="col-lg-6 order-lg-2 text-white" style={{backgroundImage: `url(${will})`, backgroundPosition: 'center center',
    backgroundSize: 'cover',}} ></div>
                    <div className="col-lg-6  my-auto p-5">
                        <h2>IA para gestão de Marketing</h2>
                        <p className="lead mb-0">Análise de dados de vendas anteriores e comportamento dos clientes, identificando padrões de consumo e preferências.
                        Recomendações de estratégias de marketing personalizadas, com base em dados de mercado e perfil do público-alvo.
                        Projeções e estimativas de vendas futuras, considerando variáveis como sazonalidade, tendências do setor e desempenho histórico.
                        Apoio à tomada de decisão estratégica, ajudando a definir quais produtos priorizar, canais de venda mais eficazes e ações promocionais com maior potencial de retorno.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <section className="testimonials text-center bg-light p-5">
            <div className="container">
                <h2 className="mb-5">Desenvolvedores</h2>
                <div className="row">
                    <div className="col-lg-4">
                        <div className="testimonial-item mx-auto mb-5 mb-lg-0">
                            <img className="shadow object-fit-cover img-thumbnail rounded-circle mb-3" width={200} style={{ height: '200px' }}  src={igor} />
                            <h5>Igor Spindola</h5>
                            <p className="font-weight-light mb-0">RM: 557761</p>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="testimonial-item mx-auto mb-5 mb-lg-0">
                            <img className="shadow object-fit-cover img-thumbnail rounded-circle mb-3" width={200} style={{ height: '200px'}} src={mateus}  />
                            <h5>Mateus Borba</h5>
                            <p className="font-weight-light mb-0">RM: 556418</p>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="testimonial-item mx-auto mb-5 mb-lg-0">
                            <img className="shadow object-fit-cover img-thumbnail rounded-circle mb-3" width={200} style={{ height: '200px'}}  src={pedro} />
                            <h5>Pedro Morais</h5>
                            <p className="font-weight-light mb-0">RM: 557533</p>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="testimonial-item mx-auto mb-5 mb-lg-0">
                            <img className="shadow object-fit-cover img-thumbnail rounded-circle mb-3" width={200} style={{ height: '200px'}}  src={rafael} />
                            <h5>Rafael Daloia</h5>
                            <p className="font-weight-light mb-0">RM: 555356</p>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="testimonial-item mx-auto mb-5 mb-lg-0">
                            <img className="shadow object-fit-cover img-thumbnail rounded-circle mb-3" width={200} style={{ height: '200px'}}  src={tiago} />
                            <h5>Tiago Decker</h5>
                            <p className="font-weight-light mb-0">RM: 556438</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <footer className="bg-dark text-light py-4 mt-auto">
            <div className="container text-center">
            <p className="mb-0">&copy; 2025 Flux ERP.</p>
            </div>
        </footer>
        </>
    )
}