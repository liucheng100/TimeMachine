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
    needHeader: true,
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

export function resetPass<T>(data: any) {
  return http.post<T>({
    url: "/user/reset",
    params: {
      code: data.code,
      newPassword: data.newPassword,
      email: data.email,
    },
  });
}

export function getUserInfo<T>(userId: any) {
  return http.get<T>({
    url: "/user/info",
    params: {
      userId,
    },
  });
}

export function updateInfo<T>(data: any) {
  return http.post<T>({
    url: "/user/update",
    data: {
      userId:data.userId,
      avatar:data.avatar,
      nickname:data.nickname,
    },
  });
}
