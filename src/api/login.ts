import http from "@/utils/request";

export function login<T>(data: any) {
  return http.post<T>({
    url: "/api/manager/login",
    needHeader: true,
    data: data,
  });
}
