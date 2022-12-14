import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Channel } from 'src/app/models/channel';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ChannelService } from 'src/app/services/channel.service';

@Component({
  selector: 'app-share-content',
  templateUrl: './share-content.component.html',
  styleUrls: ['./share-content.component.scss'],
})
export class ShareContentComponent implements OnInit {
  name!: String;
  userToken = sessionStorage.getItem('user');
  channels: Channel[] = [];
  user!: User;
  _video: any;
  _book: any;
  chName!: String;

  constructor(
    public dialogRef: MatDialogRef<ShareContentComponent>,
    private channelService: ChannelService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authenticationApi: AuthenticationService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this._video = this.data.video;
    this._book = this.data.book;

    this.getUserInfo();
    setTimeout(() => {
      this.getUserChannels();
    }, 500);
    console.log(this.chName);

    if (this.channelService.channelName) {
      this.chName = this.channelService.channelName;
      this.name = this.chName;
    } else {
      this.name = '';
    }
  }

  getUserChannels() {
    this.channelService
      .getAllChannels(this.userToken)
      .then((resp: any) => {
        let rooms: Channel[] = resp.rooms;
        if (this.user.joinedRooms.length > 0) {
          this.compare(rooms, this.user.joinedRooms);
        } else {
          this.channels = [];
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  compare(arr1: any[], arr2: any[]) {
    arr1.forEach((a: Channel) => {
      arr2.forEach((b: any) => {
        if (a._id === b._id) {
          this.channels.push(a);
        }
      });
    });
  }

  getUserInfo() {
    this.authenticationApi
      .getUserInfo(this.userToken)
      .then((Response: any) => {
        this.user = Response.user;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  submit() {
    let cha: Channel = {
      joinedUsers: [],
      messages: [],
      books: [],
      videos: [],
      title: '',
    };

    this.channels.forEach((ch) => {
      if (ch._id === this.name) {
        cha = ch;
      }
    });

    if (this._video) {
      let data = {
        roomId:
          this.channelService.fromChannel === true ? this.chName : this.name,
        videoId: this._video.id.videoId,
        videoTitle: this._video.snippet.title,
        videoKind: this._video.id.kind,
        videoThumbnail: this._video.snippet.thumbnails.high.url,
      };

      const check = cha.videos.every(
        (vid) =>
          vid.videoId !== data.videoId &&
          vid.videoTitle !== data.videoTitle &&
          vid.videoThumbnail !== data.videoThumbnail
      );

      if (check) {
        this.channelService
          .shareVideo(this.userToken, data)
          .then((response: any) => {
            this.dialogRef.close();
            this.router.navigate(['my-channels/' + data.roomId]);
            this.toastr.success(
              'Video shared successfully to channel',
              'Success',
              {
                timeOut: 2500,
              }
            );
          })
          .catch((e) => {
            console.log(e);
          });
      } else if (!check) {
        this.toastr.error('Video already exists in channel', 'Error', {
          timeOut: 2500,
        });
      }
    } else if (this._book) {
      let data = {
        roomId:
          this.channelService.fromChannel === true ? this.chName : this.name,
        bookImageLink: this._book.volumeInfo.imageLinks ? 'link' : '',
        bookThumbnail: this._book.volumeInfo.imageLinks
          ? this._book.volumeInfo.imageLinks.thumbnail
          : '',
        bookTitle: this._book.volumeInfo.title,
        bookPreviewLink: this._book.volumeInfo.previewLink,
        bookAuthors: this._book.volumeInfo.authors,
      };

      const check = cha.books.every(
        (book) => book.bookPreviewLink !== data.bookPreviewLink
      );

      if (check) {
        this.channelService
          .shareBook(this.userToken, data)
          .then((response: any) => {
            this.dialogRef.close();
            this.router.navigate(['my-channels/' + data.roomId]);
            this.toastr.success(
              'Book shared successfully to channel',
              'Success',
              {
                timeOut: 2500,
              }
            );
          })
          .catch((e) => {
            console.log(e);
          });
      } else if (!check) {
        this.toastr.error('Book already exists in channel', 'Error', {
          timeOut: 2500,
        });
      }
    }
  }
}
