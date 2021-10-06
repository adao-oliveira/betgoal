import React from 'react'
import emailjs from "emailjs-com"

function sendEmailAposta(e) {
  e.preventDefault();

  emailjs.sendForm('default_service', 'template_15595bq', e.target, 'user_k1rVZVH5xCEoZIyG4E9RI')
    .then((result) => {
      alert("E-mail enviado com sucesso");
    }, (error) => {
      alert("Ocorreu um erro inesperado, verifique os dados e tente novamente!");
    });
  e.target.reset()
}

export const SendAposta = () => (
  <>
    <div className="fundo">
      <section className="form-section">
        <h1> Formulário de Aposta </h1>

        <div className="form-wrapper">
          <form onSubmit={sendEmailAposta}>
            <div className="input-block">
              <input type="email" name="from_email" id="from_email" placeholder="Seu melhor e-mail" required />
            </div>
            <div className="input-block">
              <input type='name' name="from_name" id="from_name" placeholder="Nome completo" required />
            </div>
            <div className="input-block">
              <input type='number' name="from_whatsapp" id="from_whatsapp" placeholder="Whatsapp" required />
            </div>
            <div className="input-block">
              <input type='name' name="from_pix" id="from_pix" placeholder="Informe seu PIX" required />
            </div>
            <div className="input-block">
              <textarea type='mensagem' name="from_mensagem" id="from_mensagem" placeholder="Deixe uma mensagem..." required />
            </div>
            <button type='submit' className="btn-enviar mt-4">Enviar Aposta</button>
          </form>
        </div>
      </section>
    </div>
    <style jsx>{`

.fundo {
  background-color: #1b8231;
}

    section {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding-bottom: 50px;
    }
    
    h1 {
      padding-top: 40px;
      color: #fff;
      font-size: 25px;
      font-weight: 200;
      text-align: center;
      font-family: 'Courier New', Courier, monospace;
    }
    
    .form-wrapper form {
      margin: 20px 0;
      background-color: #111;
      padding: 30px 25px;
      border-radius: 5px;
    }
    
    .form-wrapper form .input-block {
      margin-bottom: 20px;
    }
    
    .form-wrapper form .input-block label {
      font-size: 14px;
      color: #111;
    }
    
    .form-wrapper form .input-block input {
      width: 100%;
      margin-top: 8px;
      padding: 7px;
      font-family: 'Courier New', Courier, monospace;
      font-size: 16px;
      color: #1d20ff;
      outline-color: #1d20ff;
      height: 50px;
      border: none;
      border-radius: 5px;
      background: #ffffff;
      box-shadow: inset 9px 9px 19px #d9d9d9, inset -9px -9px 19px #ffffff;
    }

    textarea {
      font-family: 'Courier New', Courier, monospace;
      min-width: 30vw;
      margin: 10px auto;
      padding: 20px;
      border-radius: 5px;
      outline-color: #fff;
      background-color: #fff !important;
      color: #111 !important;
    }

    textarea::placeholder {
      color: #111;
    }
    
  .btn-enviar {
      display: block;
      min-width: 150px;
      border: none;
      background-color: #eaa800;
      color: white;
      border-radius: 25px;
      margin: auto;
      padding: 7px;
    }
  
  .btn-enviar:hover {
      background-color: #1b8231;
    }

`}</style>

  </>

)

export default SendAposta