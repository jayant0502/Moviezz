import React from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonIcon,
  IonImg,
  IonLabel,
  IonRow,
  IonTitle,
} from "@ionic/react";
import { starHalfOutline, tvOutline, videocamOutline } from "ionicons/icons";
import "./MovieLists.css";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Keyboard,
  Pagination,
  Scrollbar,
  Zoom,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/keyboard";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/zoom";
import "@ionic/react/css/ionic-swiper.css";

interface MovieListsProp {
  movieData: any[];
}

export const baseUrl = "https://image.tmdb.org/t/p/original";

const MovieLists: React.FC<MovieListsProp> = ({ movieData }) => {
  return (
    <div className="movie-list-container">
      <IonTitle className="ion-padding" >Trending</IonTitle>

      <Swiper
        modules={[Autoplay, Keyboard, Pagination, Scrollbar, Zoom]}
        slidesPerView={3}
        autoplay={true}
        loop={true}
        keyboard={true}
        pagination={true}
        scrollbar={true}
        zoom={true}
        spaceBetween={0}
      >
        {movieData.map(
          ({
            id,
            poster_path,
            media_type,
            title,
            name,
            release_date,
            first_air_date,
            vote_average,


            
          }) => (
            <SwiperSlide>
              <IonCard className="movie-card">
                <IonImg className="poster-img" src={baseUrl + poster_path} />
                <IonCardHeader className="card-header">
                  <IonCardTitle>
                    {media_type === "movie" ? title : name}
                  </IonCardTitle>
                  <IonCardSubtitle>
                    {media_type === "movie" ? release_date : first_air_date}
                  </IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent className="card-content ">
                  <IonRow>
                    <IonCol className="type" size="6">
                      <IonIcon
                        icon={
                          media_type === "movie" ? videocamOutline : tvOutline
                        }
                        color="warning"
                      />
                      <IonLabel>{media_type}</IonLabel>
                    </IonCol>
                    <IonCol className="type" size="6">
                      <IonIcon icon={starHalfOutline} color="warning" />
                      <IonLabel>{vote_average}</IonLabel>
                    </IonCol>
                  </IonRow>
                </IonCardContent>
              </IonCard>
            </SwiperSlide>
          )
        )}
      </Swiper>
    </div>
  );
};

export default MovieLists;
