import http from "@/utils/request";

export function login<T>(data: any) {
  return http.post<T>({
    url: "/user/login/tju",
    needHeader: true,
    data: {
      password: data.password,
      username: data.username
    },
  });
}

export function loginA<T>(data: any) {
  return http.post<T>({
    url: "/user/login/common",
    data: {
      password: data.password,
      username: data.username
    },
  });
}

export function sendCode<T>(email: any) {
  return http.post<T>({
    url: "/user/send",
    params: {
      email: email,
    },
  });
}

export function verifyCode<T>(data: any) {
  return http.post<T>({
    url: "/user/verify",
    params: {
      code: data.code,
      email: data.email,
    },
  });
}

export function register<T>(data: any) {
  return http.post<T>({
    url: "/user/register/common",
    data: {
      checkPassword: data.password,
      password: data.password,
      username: data.email,
    },
  });
}
