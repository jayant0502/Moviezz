import {
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonImg,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonText,
  IonToolbar,
  useIonAlert,
  useIonLoading,
} from "@ionic/react";
import "./Home.css";
import useApi, {
  SearchError,
  SearchResult,
  SearchType,
  AllData,
} from "../hooks/useApi";
import { useEffect, useState } from "react";
import MovieLists from "../components/MovieLists";
import logo from "../assests/logo/logo.png";
import SearchResultsModal from "../components/SearchResultsModal";

const Home: React.FC = () => {
  const { searchData, getALLDATA } = useApi();
  const [searchTerm, setSearchTerm] = useState<any>("");
  const [type, setType] = useState<SearchType>(SearchType.all);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [movies, setMovies] = useState<AllData[]>([]);
  const [error, setError] = useState<SearchError[]>([]);
  const [presentAlert] = useIonAlert();
  const [loading, dismiss] = useIonLoading();
  const [isOpen, setIsOpen] = useState<boolean>(true);

  // useEffect(() => {
  //   const allMovies = async () => {
  //     try {
  //       // await loading();
  //       const res: any = await getALLDATA();
  //       // await dismiss()
  //       setMovies(res?.results);

  //       console.log("movies data", res);
  //     } catch (error) {
  //       console.log("Error: " + error);
  //     }
  //   };

  //   const data = async () => {
  //     try {
  //       await loading();
  //       const res: any = await searchData(searchTerm, type);
  //       await dismiss();
  //       if (res?.results.length === 0 && res?.total_results === 0) {
  //         presentAlert("No movies found");
  //         setSearchTerm("");
  //       } else {
  //         setResults(res.Search);
  //       }
  //     } catch (err) {
  //       console.log("Error", err);
  //     }
  //   };

  //   if (searchTerm !== "") {
  //     data();
  //   }else{
  //     allMovies();

  //   }
  // }, [searchTerm, type]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (searchTerm !== "") {
          await loading()
          const res: any = await searchData(searchTerm, type);
          await dismiss()
          if (res?.results.length === 0 && res?.total_results === 0) {
            presentAlert("No movies found");
            setSearchTerm("");
          } else {
            setResults(res.results);
            console.log(res.results)
            setIsOpen(true); // Open the modal when search results are available
          }
        } else {
          const res: any = await getALLDATA();
          setMovies(res?.results);
          setIsOpen(true); // Open the modal when all movies are loaded
        }
      } catch (error) {
        console.log("Error: " + error);
      }
    };

    fetchData();
  }, [searchTerm, type]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"primary"}>
          <IonGrid>
            <IonRow>
              <IonCol size="12">
                <div className="logo-container">
                  <IonImg src={logo} alt="logo" className="logo"></IonImg>
                  <IonText>Moviezz</IonText>
                </div>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12">
                <IonSearchbar
                  value={searchTerm}
                  debounce={300}
                  color={"light"}
                  mode="md"
                  className="ion-padding searchbar"
                  onIonChange={(e) => setSearchTerm(e.detail.value?.trim())}
                />
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItem>
          <IonLabel>Search Type</IonLabel>
          <IonSelect value={type} onIonChange={(e) => setType(e.detail.value)}>
            <IonSelectOption value={"multi"}>All</IonSelectOption>
            <IonSelectOption value={"movie"}>Movie</IonSelectOption>
            <IonSelectOption value={"tv"}>Tv Series</IonSelectOption>
          </IonSelect>
        </IonItem>

        {searchTerm !== "" && (
          <SearchResultsModal
            isOpen={isOpen}
            onClose={() => {
              setSearchTerm(""), setIsOpen(false);
            }}
            results={results}
          />
        )}
        {searchTerm === "" && <MovieLists movieData={movies}></MovieLists>}
      </IonContent>
    </IonPage>
  );
};

export default Home;
