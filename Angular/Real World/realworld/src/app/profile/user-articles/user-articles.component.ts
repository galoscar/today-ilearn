import {AfterViewInit, Component, DoCheck, OnInit} from '@angular/core';
import {ApiService} from '../../shared/api.service';
import {Article} from '../../shared/article.model';
import {User} from '../../shared/user.model';
import {ActivatedRoute} from '@angular/router';
import {UserProfileService} from '../../shared/userprofile.service';

@Component({
  selector: 'app-user-articles',
  templateUrl: './user-articles.component.html',
  styleUrls: ['./user-articles.component.css']
})
export class UserArticlesComponent implements OnInit {

  articleList: Article[] = null;
  articleListLength = 0;
  totalPages = [];
  loading = true;
  noArticles = false;

  constructor(private apiService: ApiService,
              private user: User,
              private route: ActivatedRoute,
              private userProfileService: UserProfileService) { }

  getListByAuthor() {
    const listArt: Article[] = [];
    this.apiService.getArticlesByAuthorWithOffset(this.userProfileService.username, '0').subscribe(
      (response: any) => {
        for (const article of response.articles) {
          const art = new Article(article);
          listArt.push(art);
        }
        const listLength = response.articlesCount;
        const noPages = (listLength < 10) ? 1 : Math.ceil(listLength / 10) ;

        this.articleListLength = listLength;
        this.totalPages = Array.from(Array(noPages).keys());
        this.totalPages = this.totalPages.map(elem => elem + 1);
        this.articleList = listArt;
        this.loading = false;
        if (this.articleListLength === 0) {
          this.noArticles = true;
        }
      },
      (error1 => {})
    );
  }

  ngOnInit() {
    this.getListByAuthor();
  }

}
