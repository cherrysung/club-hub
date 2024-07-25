import { Container } from "@mui/material";
import { useUser } from "../providers/userProvider";
import MyInfo from "../components/profile/MyInfo";
import MyRecommendations from "../components/profile/MyRecommendations";
import MyFavorites from "../components/profile/MyFavorites";
import { useNavigate } from "react-router-dom";
import { useClubs } from "../providers/clubsProvider";
import { useCallback, useEffect, useState } from "react";

function Profile() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { clubs } = useClubs();
  const [recommendedClubs, setRecommendedClubs] = useState([]);
  const favoriteClubs = ["11 Club", "12 Club", "13 Club", "14 Club"];

  const getRecommendedClubs = useCallback(() => {
    if (!user) return;

    let recommendedClubs = [];
    const clubIds = user.recommendations?.clubIds;

    if (clubIds && clubIds.length > 0) {
      recommendedClubs = clubIds
        .map((id) => clubs.find((club) => club.clubId === id))
        .sort((a, b) => {
          const aName = a?.club_name ?? "";
          const bName = b?.club_name ?? "";
          return aName.localeCompare(bName);
        });
    }

    return recommendedClubs;
  }, [clubs, user]);

  const goToClub = (clubId) => {
    navigate(`/club/${clubId}`);
  };

  const goToSurvey = () => {
    navigate("/recommend");
  };

  useEffect(() => {
    const recommendedClubs = getRecommendedClubs();
    setRecommendedClubs(recommendedClubs);
  }, [getRecommendedClubs]);

  return (
    <Container>
      <MyInfo onNavigate={goToClub} />
      <MyRecommendations
        onNavigate={goToClub}
        onTakeSurvey={goToSurvey}
        recommendations={recommendedClubs}
      />

      <MyFavorites onNavigate={goToClub} recommendations={favoriteClubs} />
    </Container>
  );
}

export default Profile;
