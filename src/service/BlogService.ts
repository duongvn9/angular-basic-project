import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ResposeData } from "../app/shared/types/responseData";
import { BlogItem, ProductItems } from "../app/shared/types/productItem";

@Injectable({ providedIn: 'root' })
export class BlogService {
    constructor(private http: HttpClient) { }

    getBlogs(): Observable<ResposeData<ProductItems[]>> {
        return this.http.get<any>('/api/blogs');
    }

    detailBlog(id: number): Observable<ResposeData<ProductItems>> {
        return this.http.get<any>(`/api/blogs/${id}`);
    }

    postBlog(blogItem: BlogItem): Observable<ResposeData<ProductItems>> {
        return this.http.post<any>(`/api/blogs`, blogItem);
    }

    deleteBlog(id: number): Observable<ResposeData<ProductItems>> {
        return this.http.delete<any>(`/api/blogs/${id}`);
    }
}