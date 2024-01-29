import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRecipe } from '../../../../backend/src/database/models/recipeModel';

@Injectable({
  providedIn: 'root',
})

export class RecipeAdapter {
  private baseURL = 'http://localhost:3000/api/v1';

  constructor(private http: HttpClient) {}

  post(data: any): Observable<IRecipe> {
    const url = `${this.baseURL}/recipes`;

    return this.http.post<IRecipe>(url, data);
  }

  get(params: any): Observable<IRecipe[]> {
    const url = `${this.baseURL}/recipes`;

    return this.http.get<IRecipe[]>(url, { params });
  }

  getById(id: string): Observable<IRecipe> {
    const url = `${this.baseURL}/recipes/${id}`;

    return this.http.get<IRecipe>(url);
  }

  update(id: string, updatedFields: IRecipe): Observable<IRecipe> {
    const url = `${this.baseURL}/recipes/${id}`;

    return this.http.put<IRecipe>(url, updatedFields);
  }

  delete(id: string): Observable<IRecipe> {
    const url = `${this.baseURL}/recipes/${id}`;
    return this.http.delete<IRecipe>(url);
  }
}
