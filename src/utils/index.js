export const setLocalStorage = (key, value) => {
  if (typeof value === "object") {
    value = jsonToString(value);
  }
  localStorage.setItem(key, window.btoa(encodeURIComponent(value)));
};

export const getLocalStorage = (key) => {
  let value = localStorage.getItem(key);
  if (value != null) {
    const decoded = decodeURIComponent(window.atob(value));
    const parsed = jsonFromString(decoded);
    if (typeof parsed === "object") {
      return parsed;
    }
    return decoded;
  }
};

export const jsonToString = (value) => {
  if (typeof value === "object") {
    return JSON.stringify(value);
  } else {
    return console.error("jsonToString() error: input type error");
  }
};

export const jsonFromString = (value) => {
  let parsed = "";
  if (typeof value === "string") {
    try {
      parsed = JSON.parse(value);
    } catch {
      parsed = value;
    }
    return parsed;
  } else {
    return console.error("jsonFromString() error: input type error");
  }
};

export const serachAddr = (callback) => {
  let fullRoadAddr = "";
  let extraRoadAddr = "";
  try {
    new window.daum.Postcode({
      oncomplete: (data) => {
        fullRoadAddr = data.roadAddress;
        extraRoadAddr = "";

        if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
          extraRoadAddr += data.bname;
        }
        if (data.buildingName !== "" && data.apartment === "Y") {
          extraRoadAddr +=
            extraRoadAddr !== "" ? ", " + data.buildingName : data.buildingName;
        }
        if (extraRoadAddr !== "") {
          extraRoadAddr = " (" + extraRoadAddr + ")";
        }
        if (fullRoadAddr !== "") {
          fullRoadAddr += extraRoadAddr;
        }

        callback(fullRoadAddr);
      },
    }).open();
  } catch {
    console.log("serachAddr() error: addr api error");
  }
};

export const isRegExp = (data, type) => {
  const regExpEmail =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{3}$/i;
  const regExpPw =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  if (type === "email") {
    if (!regExpEmail.test(data)) {
      return false;
    } else {
      return true;
    }
  } else {
    if (!regExpPw.test(data)) {
      return false;
    } else {
      return true;
    }
  }
};
