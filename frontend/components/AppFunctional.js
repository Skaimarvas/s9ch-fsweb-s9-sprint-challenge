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
  function getXY() {
    // Koordinatları izlemek için bir state e sahip olmak gerekli değildir.
    // Bunları hesaplayabilmek için "B" nin hangi indexte olduğunu bilmek yeterlidir.

    const coordinate =
      bval === 0
        ? [1, 1]
        : bval === 1
        ? [1, 2]
        : bval === 2
        ? [1, 3]
        : bval === 3
        ? [2, 1]
        : bval === 4
        ? [2, 2]
        : bval === 5
        ? [2, 3]
        : bval === 6
        ? [3, 1]
        : bval === 7
        ? [3, 2]
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
    const message = getXY();

    return `Koordinatlar (${message[0]}, ${message[1]})`;
  }
  const crdntMessage = getXYMesaj();
  function reset() {
    // Tüm stateleri başlangıç ​​değerlerine sıfırlamak için bu helperı kullanın.
    setBval(4);
    setStp(0);
  }

  function sonrakiIndex(yon) {
    // Bu helper bir yön ("sol", "yukarı", vb.) alır ve "B" nin bir sonraki indeksinin ne olduğunu hesaplar.
    // Gridin kenarına ulaşıldığında başka gidecek yer olmadığı için,
    // şu anki indeksi değiştirmemeli.
    if (yon === "up") {
      if (bval === 6) {
        return 3;
      }
      if (bval === 7) {
        return 4;
      }
      if (bval === 8) {
        return 5;
      }
      if (bval === 3) {
        return 0;
      }
      if (bval === 4) {
        return 1;
      }
      if (bval === 5) {
        return 2;
      }
      if (bval === 0) {
        return 0;
      }
      if (bval === 1) {
        return 1;
      }
      if (bval === 2) {
        return 2;
      }
    }
    if (yon === "down") {
      if (bval === 0) {
        return 3;
      }
      if (bval === 1) {
        return 4;
      }
      if (bval === 2) {
        return 5;
      }
      if (bval === 3) {
        return 6;
      }
      if (bval === 4) {
        return 7;
      }
      if (bval === 5) {
        return 8;
      }
      if (bval === 6) {
        return 6;
      }
      if (bval === 7) {
        return 7;
      }
      if (bval === 8) {
        return 8;
      }
    }
    if (yon === "left") {
      if (bval === 0) {
        return 0;
      }
      if (bval === 1) {
        return 0;
      }
      if (bval === 2) {
        return 1;
      }
      if (bval === 3) {
        return 3;
      }
      if (bval === 4) {
        return 3;
      }
      if (bval === 5) {
        return 4;
      }
      if (bval === 6) {
        return 6;
      }
      if (bval === 7) {
        return 6;
      }
      if (bval === 8) {
        return 7;
      }
    }
    if (yon === "right") {
      if (bval === 0) {
        return 1;
      }
      if (bval === 1) {
        return 2;
      }
      if (bval === 2) {
        return 2;
      }
      if (bval === 3) {
        return 4;
      }
      if (bval === 4) {
        return 5;
      }
      if (bval === 5) {
        return 5;
      }
      if (bval === 6) {
        return 7;
      }
      if (bval === 7) {
        return 8;
      }
      if (bval === 8) {
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

    setPayLoad({
      ...payLoad,
      email: value,
    });
  }

  function onSubmit(evt) {
    // payloadu POST etmek için bir submit handlera da ihtiyacınız var.
    evt.preventDefault();

    axios
      .post("http://localhost:9000/api/result", payLoad)
      .then((res) => {
        setMessage(res.data.message);
        console.log("Res Data", res.data);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setMessage(err.response.data.message);
      });
  }
  useEffect(() => {
    console.log("STEP", stp);
    console.log("getXYMesaj", getXYMesaj());
    console.log("Payload", payLoad);
    setPayLoad({
      ...payLoad,
      steps: stp,
      x: crdnt[0],
      y: crdnt[1],
    });
  }, [bval, email, steps, x, y]);

  useEffect(() => {
    console.log("bval", bval);
    console.log("STEP BAŞLANGIÇ", stp);
  }, []);

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMesaj()}</h3>
        <h3 id="steps">{stp} kere ilerlediniz</h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div key={idx} className={`square${idx === bval ? " active" : ""}`}>
            {idx === bval ? "B" : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message"> {message} </h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={ilerle}>
          SOL
        </button>
        <button id="up" onClick={ilerle}>
          YUKARI
        </button>
        <button id="right" onClick={ilerle}>
          SAĞ
        </button>
        <button id="down" onClick={ilerle}>
          AŞAĞI
        </button>
        <button id="reset" onClick={reset}>
          reset
        </button>
      </div>
      <form onSubmit={onSubmit}>
        <input
          id="email"
          type="email"
          placeholder="email girin"
          onChange={onChange}
          value={email}
        ></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}
