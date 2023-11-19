import React, { useEffect, useState } from "react";
import axios from "axios";

// önerilen başlangıç stateleri
const initialMessage = "";
const initialEmail = "";
const initialSteps = 0;
const initialIndex = 4; //  "B" nin bulunduğu indexi

export default function AppFunctional(props) {
  // AŞAĞIDAKİ HELPERLAR SADECE ÖNERİDİR.
  // Bunları silip kendi mantığınızla sıfırdan geliştirebilirsiniz.
  const [payLoad, setPayLoad] = useState({
    email: "",
    steps: "",
    x: "",
    y: "",
  });
  const { email, steps, x, y } = payLoad;
  const [bval, setBval] = useState(initialIndex);
  const [stp, setStp] = useState(initialSteps);
  const [message, setMessage] = useState(initialMessage);
  const [mail, setMail] = useState(initialEmail);

  function getXY() {
    // Koordinatları izlemek için bir state e sahip olmak gerekli değildir.
    // Bunları hesaplayabilmek için "B" nin hangi indexte olduğunu bilmek yeterlidir.

    const coordinate =
      bval === 0
        ? [1, 1]
        : bval === 1
        ? [2, 1]
        : bval === 2
        ? [3, 1]
        : bval === 3
        ? [1, 2]
        : bval === 4
        ? [2, 2]
        : bval === 5
        ? [3, 2]
        : bval === 6
        ? [1, 3]
        : bval === 7
        ? [2, 3]
        : bval === 8
        ? [3, 3]
        : "";

    return coordinate;
  }
  const crdnt = getXY();
  function getXYMesaj() {
    // Kullanıcı için "Koordinatlar (2, 2)" mesajını izlemek için bir state'in olması gerekli değildir.
    // Koordinatları almak için yukarıdaki "getXY" helperını ve ardından "getXYMesaj"ı kullanabilirsiniz.
    // tamamen oluşturulmuş stringi döndürür.

    const [a, b] = crdnt;

    return `Koordinatlar (${a}, ${b})`;
  }
  const crdntMessage = getXYMesaj();
  function reset() {
    // Tüm stateleri başlangıç ​​değerlerine sıfırlamak için bu helperı kullanın.
    setBval(initialIndex);
    setStp(initialSteps);
    setMessage(initialMessage);
    setMail(initialEmail);
  }

  function sonrakiIndex(yon) {
    // Bu helper bir yön ("sol", "yukarı", vb.) alır ve "B" nin bir sonraki indeksinin ne olduğunu hesaplar.
    // Gridin kenarına ulaşıldığında başka gidecek yer olmadığı için,
    // şu anki indeksi değiştirmemeli.
    if (yon === "up") {
      if (bval === 6) {
        setMessage(initialMessage);
        return 3;
      }
      if (bval === 7) {
        setMessage(initialMessage);
        return 4;
      }
      if (bval === 8) {
        setMessage(initialMessage);
        return 5;
      }
      if (bval === 3) {
        setMessage(initialMessage);
        return 0;
      }
      if (bval === 4) {
        setMessage(initialMessage);
        return 1;
      }
      if (bval === 5) {
        setMessage(initialMessage);
        return 2;
      }
      if (bval === 0) {
        setMessage("Yukarıya gidemezsiniz");
        return 0;
      }
      if (bval === 1) {
        setMessage("Yukarıya gidemezsiniz");
        return 1;
      }
      if (bval === 2) {
        setMessage("Yukarıya gidemezsiniz");
        return 2;
      }
    }
    if (yon === "down") {
      if (bval === 0) {
        setMessage(initialMessage);
        return 3;
      }
      if (bval === 1) {
        setMessage(initialMessage);
        return 4;
      }
      if (bval === 2) {
        setMessage(initialMessage);
        return 5;
      }
      if (bval === 3) {
        setMessage(initialMessage);
        return 6;
      }
      if (bval === 4) {
        setMessage(initialMessage);
        return 7;
      }
      if (bval === 5) {
        setMessage(initialMessage);
        return 8;
      }
      if (bval === 6) {
        setMessage("Aşağıya gidemezsiniz");
        return 6;
      }
      if (bval === 7) {
        setMessage("Aşağıya gidemezsiniz");
        return 7;
      }
      if (bval === 8) {
        setMessage("Aşağıya gidemezsiniz");
        return 8;
      }
    }
    if (yon === "left") {
      if (bval === 0) {
        setMessage("Sola gidemezsiniz");
        return 0;
      }
      if (bval === 1) {
        setMessage(initialMessage);
        return 0;
      }
      if (bval === 2) {
        setMessage(initialMessage);
        return 1;
      }
      if (bval === 3) {
        setMessage("Sola gidemezsiniz");
        return 3;
      }
      if (bval === 4) {
        setMessage(initialMessage);
        return 3;
      }
      if (bval === 5) {
        setMessage(initialMessage);
        return 4;
      }
      if (bval === 6) {
        setMessage("Sola gidemezsiniz");
        return 6;
      }
      if (bval === 7) {
        setMessage(initialMessage);
        return 6;
      }
      if (bval === 8) {
        setMessage(initialMessage);
        return 7;
      }
    }
    if (yon === "right") {
      if (bval === 0) {
        setMessage(initialMessage);
        return 1;
      }
      if (bval === 1) {
        setMessage(initialMessage);
        return 2;
      }
      if (bval === 2) {
        setMessage("Sağa gidemezsiniz");
        return 2;
      }
      if (bval === 3) {
        setMessage(initialMessage);
        return 4;
      }
      if (bval === 4) {
        setMessage(initialMessage);
        return 5;
      }
      if (bval === 5) {
        setMessage("Sağa gidemezsiniz");
        return 5;
      }
      if (bval === 6) {
        setMessage(initialMessage);
        return 7;
      }
      if (bval === 7) {
        setMessage(initialMessage);
        return 8;
      }
      if (bval === 8) {
        setMessage("Sağa gidemezsiniz");
        return 8;
      }

      console.log(yon);
      console.log(bval);
    }
  }
  function ilerle(evt) {
    // Bu event handler, "B" için yeni bir dizin elde etmek üzere yukarıdaki yardımcıyı kullanabilir,
    // ve buna göre state i değiştirir.
    const id = evt.target.id;
    setBval(sonrakiIndex(id));
    console.log("Console ID", id);
    console.log("Sonraki index:", sonrakiIndex(id));
    console.log("bval before:", bval, "id:", id);

    if (bval === 0 && id === "up") {
      setStp(stp);
    } else if (bval === 1 && id === "up") {
      setStp(stp);
    } else if (bval === 2 && id === "up") {
      setStp(stp);
    } else if (bval === 0 && id === "left") {
      setStp(stp);
    } else if (bval === 3 && id === "left") {
      setStp(stp);
    } else if (bval === 6 && id === "left") {
      setStp(stp);
    } else if (bval === 2 && id === "right") {
      setStp(stp);
    } else if (bval === 5 && id === "right") {
      setStp(stp);
    } else if (bval === 8 && id === "right") {
      setStp(stp);
    } else if (bval === 6 && id === "down") {
      setStp(stp);
    } else if (bval === 7 && id === "down") {
      setStp(stp);
    } else if (bval === 8 && id === "down") {
      setStp(stp);
    } else {
      setStp(stp + 1);
    }
  }

  function onChange(evt) {
    // inputun değerini güncellemek için bunu kullanabilirsiniz

    const { value } = evt.target;
    setMail(value);
  }

  function onSubmit(evt) {
    // payloadu POST etmek için bir submit handlera da ihtiyacınız var.
    evt.preventDefault();

    axios
      .post("http://localhost:9000/api/result", payLoad)
      .then((res) => {
        setMessage(res.data.message);
        console.log("Res Data", res.data);
        setMail(initialEmail);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setMessage(err.response.data.message);
      });
  }
  useEffect(() => {
    console.log("INITIAL INDEX", bval);
    console.log("INITIAL STEP", stp);
    console.log("INITIAL MESSAGE", message);
    console.log("INITIAL EMAIL", mail);
  }, []);

  useEffect(() => {
    setPayLoad({
      ...payLoad,
      email: mail,
      steps: stp,
      x: crdnt[0],
      y: crdnt[1],
    });
    console.log("STEP", stp);
    console.log("GETXYMESSAGE", crdntMessage);
    console.log("MESSAGE PERCHANGE", message);
    console.log("PAYLOAD", payLoad);
    console.log("MAIL", mail);
  }, [bval, steps, mail, email, message]);

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates" data-testid="crdt">
          {crdntMessage}
        </h3>
        <h3 id="steps" data-testid="stp">
          {stp} kere ilerlediniz
        </h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div key={idx} className={`square${idx === bval ? " active" : ""}`}>
            {idx === bval ? "B" : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" data-testid="left" onClick={ilerle}>
          SOL
        </button>
        <button id="up" data-testid="up" onClick={ilerle}>
          YUKARI
        </button>
        <button id="right" data-testid="right" onClick={ilerle}>
          SAĞ
        </button>
        <button id="down" data-testid="down" onClick={ilerle}>
          AŞAĞI
        </button>
        <button id="reset" data-testid="reset" onClick={reset}>
          reset
        </button>
      </div>
      <form onSubmit={onSubmit}>
        <input
          id="email"
          data-testid="email"
          type="email"
          placeholder="email girin"
          onChange={onChange}
          value={mail}
        ></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}
