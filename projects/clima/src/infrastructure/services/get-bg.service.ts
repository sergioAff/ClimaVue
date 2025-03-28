import { Injectable } from '@angular/core';
import { environment } from '../../../../shared/src/environment/environment';
import { createClient } from 'pexels';
import {
  IRequiredQueryBg,
  IExecuteResponse,
  IPhoto,
} from '../../domain/model/IBg';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GetBgService {
  private client = createClient(environment.apiKeyWallpaper);

  execute(query: IRequiredQueryBg): Observable<IExecuteResponse> {
    return from(
      this.client.photos.search({ query: query.query, per_page: 1 })
    ).pipe(
      map((response: any) => ({
        photos: response.photos.map((photo: any) => ({
          id: photo.id,
          width: photo.width,
          height: photo.height,
          url: photo.url,
          photographer: photo.photographer,
          photographer_url: photo.photographer_url,
          photographer_id: parseInt(photo.photographer_id, 10),
          avg_color: photo.avg_color,
          src: photo.src,
          liked: photo.liked,
          alt: photo.alt,
        })) as IPhoto[],
      }))
    );
  }
}
