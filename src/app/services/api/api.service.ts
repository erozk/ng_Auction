import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';
import { catchError, map, Observable, of } from 'rxjs';
import { auction_favourite } from 'src/app/entities/auction_favourite';
import { auction } from 'src/app/entities/auction';
import { PostToken } from 'src/app/utils/PostToken';
import { environment } from 'src/environments/environment';
import { auctions_bid } from 'src/app/entities/auctions_bid';
import { auctions_comment } from 'src/app/entities/auctions_comment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  headers !: HttpHeaders;


  login(data: any) {
    let postToken: PostToken = {
      email: data.email,
      password: data.pass
    };
    return this.http.post<any>(environment.apiEndpoint + "/auth/login", postToken);
  }
  setSession(auth: string) {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(auth);
    const expirationDate = helper.getTokenExpirationDate(auth);
    const isExpired = helper.isTokenExpired(auth);

    const expiresAt = moment(expirationDate, 'second');
    localStorage.setItem('id_token', auth);
    localStorage.setItem("expires_at", JSON.stringify(expirationDate));
    localStorage.setItem("user_Id", decodedToken.sub);
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("user_Id");
  }

  public getUserId(): number {
    return Number(localStorage.getItem("user_Id"));
  }

  public isLoggedIn() {
    if (!localStorage.getItem("expires_at")) {
      return false
    }
    else {
      return moment().isBefore(this.getExpiration());
    }
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    // const expiresAt = JSON.parse(expiration);
    const replaced = expiration?.replace(/['"]+/g, '');
    return replaced;
  }

  addAuction(data: any, imageURL: any) {
    let _data: auction = {
      id: 0,
      title: data.title,
      description: data.description,
      currentBidValue: "0",
      imageURL: imageURL,
      isOpen: true,
      user_id: this.getUserId(),
      winner_id: 0,
      isFav : 0
    };
    return this.http.post<any>(environment.apiEndpoint + "/auctions_listing/", _data).subscribe();
  }

  putAuction(data: any, id: number) {
    return this.http.put<any>(environment.apiEndpoint + "/user/" + id, data, { headers: this.headers });
  }

  deleteAuction(id: number) {
    return this.http.delete<any>(environment.apiEndpoint + "/user/" + id);
  }

  getAuctions() {
    if (this.getUserId()) {
      return this.http.get<any>(environment.apiEndpoint + "/auctions_listing/listings/" + this.getUserId());
    }
    else {
      return this.http.get<any>(environment.apiEndpoint + "/auctions_listing");
    }

  }
  getAuctionsLostByUserId() {
    return this.http.get<any>(environment.apiEndpoint + "/auctions_listing/lost/" + this.getUserId());
  }

  getAuctionsWonByUserId() {
    return this.http.get<any>(environment.apiEndpoint + "/auctions_listing/won/" + this.getUserId());
  }

  getAuctionById(id: number) {
    return this.http.get<any>(environment.apiEndpoint + "/auctions_listing/" + id);
  }

  patchAuctionById(_data: any,_id:number) {
    let data: auction = {
      id: 0,
      title: "",
      description: "",
      currentBidValue: _data.value.toString(),
      imageURL: "",
      isOpen: true,
      user_id: this.getUserId(),
      winner_id: 0,
      isFav : 0
    };
    return this.http.patch<any>(environment.apiEndpoint + "/auctions_listing/" + _id, data);
  }

  patchAuctionCloseById(_isOpen:boolean,_id:number) {
    let data: auction = {
      id: 0,
      title: "",
      description: "",
      currentBidValue: "",
      imageURL: "",
      isOpen: _isOpen,
      user_id: this.getUserId(),
      winner_id: 0,
      isFav : 0
    };
    return this.http.patch<any>(environment.apiEndpoint + "/auctions_listing/close/" + _id, data);
  }

  getWatchlistOfUser() {
    return this.http.get<any>(environment.apiEndpoint + "/auctions_listing/watchlist/" + this.getUserId());
  }

  addWatchlistItem(listingid: number, userid: number) {
    let data: auction_favourite = {
      id: 0,
      listing_id: listingid,
      user_id: userid
    };
    return this.http.post<any>(environment.apiEndpoint + "/auctions_listing_watchlistusers/", data);
  }

  deleteWatchlistItem(listing_id: number, user_id: number) {
    return this.http.delete<any>(environment.apiEndpoint + "/auctions_listing_watchlistusers/" + listing_id + "/" + user_id);
  }

  fileUpload(file: File, _data: any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('input_file', file);
    this.http.post<any>(environment.apiEndpoint + "/auctions_listing/upload/", formData, {
      responseType: 'json'
    }).subscribe({
          next: (res) => {
            return this.addAuction(_data,res.link)
          }, 
          error: () => {
            console.log("fileupload subscribe error")
          }
        });
     return of("");
  }

  getBidsByListingId(listingId : number) {
    return this.http.get<any>(environment.apiEndpoint + "/auctions_bid/auction/" + listingId);
  }

  addBid(data: any,listingid : number) {
    let _data: auctions_bid = {
      id: 0,
      value : data.value,
      listing_id: listingid,
      user_id: this.getUserId()
    };
    return this.http.post<any>(environment.apiEndpoint + "/auctions_bid/", _data);
  }

  getCommentsByListingId(listingId : number) {
    return this.http.get<any>(environment.apiEndpoint + "/auctions_comment/auction/" + listingId);
  }

  addComment(data: any,listingid : number) {
    let _data: auctions_comment = {
      id: 0,
      content : data.content,
      listing_id: listingid,
      user_id: this.getUserId()
    };
    return this.http.post<any>(environment.apiEndpoint + "/auctions_comment/", _data);
  }
}
