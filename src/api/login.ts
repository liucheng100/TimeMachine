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
    // needHeader: true,
    data: {
      password: data.password,
      username: data.username
    },
  });
}
