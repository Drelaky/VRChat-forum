import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../shared/types/api.types';
import { FormControl, FormGroup } from '@angular/forms';
import {
  AltCategory,
  MainCategory,
} from '../../shared/types/mainCategory.types';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  saveMainCategory(
    formgroup: FormGroup
  ): Observable<ApiResponse<string, string>> {
    return this.http.post<ApiResponse<string, string>>(
      `forum-main-category/create`,
      formgroup.value
    );
  }

  getMainCategory(): Observable<ApiResponse<string, MainCategory[]>> {
    return this.http.get<ApiResponse<string, MainCategory[]>>(
      `forum-main-category/getAllMainCategory`
    );
  }

  saveSubCategory(
    mainCategory: string,
    formgroup: FormGroup
  ): Observable<ApiResponse<string, string>> {
    return this.http.post<ApiResponse<string, string>>(
      `forum-sub-category/create`,
      {
        mainCategory,
        categoryData: formgroup.value,
      }
    );
  }

  getMainCategoryOneById(
    id: string
  ): Observable<ApiResponse<string, MainCategory[]>> {
    return this.http.post<ApiResponse<string, MainCategory[]>>(
      'forum-main-category/getFourmMainCategoryOneById',
      { id }
    );
  }
  getSubCategoryOneById(
    id: string
  ): Observable<ApiResponse<string, AltCategory[]>> {
    return this.http.post<ApiResponse<string, AltCategory[]>>(
      'forum-sub-category/getForumAltOneById',
      { id }
    );
  }
}
