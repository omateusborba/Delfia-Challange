import { useState } from "react";
import { Toast } from "bootstrap";
import axios from "axios";

export default function IA() {
    return (
        <>
            <div className="main">
                <div className="row m-3 justify-content-center">
                    <div className="col-12 p-0">
                        <div className="row row-cols-1">
                            <div className="col">
                                <div className="shadow card text-bg-light">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <h5 className="card-title">Insight IA</h5>
                                            <div className="d-flex gap-2">
                                                <button className="btn btn-info">Gerar um novo</button>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="card-text">
                                            Teste
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
