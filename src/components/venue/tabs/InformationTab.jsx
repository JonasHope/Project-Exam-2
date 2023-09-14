import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faWifi,
  faCar,
  faDog,
  faCoffee,
} from "@fortawesome/free-solid-svg-icons";

const Metas = styled.div`
  display: flex;
  align-items: flex-start;
`;

const IconColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${(props) => props.theme.color.c7};
`;

const TextColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 10px;
  font-size: 0.8rem;
`;

const IconSpace = styled.div`
  padding: 8px 0;
`;

const IconTextSpace = styled.div`
  padding: 5px 0;
`;

const VenueMeta = styled.div`
  color: ${(props) => props.theme.color.c3};
`;

function InformationTab({ venueData }) {
  return (
    <VenueMeta>
      <Metas>
        <IconColumn>
          <IconTextSpace>
            <FontAwesomeIcon icon={faUser} />
          </IconTextSpace>
          {venueData.meta.wifi && (
            <IconTextSpace>
              <FontAwesomeIcon icon={faWifi} />
            </IconTextSpace>
          )}
          {venueData.meta.parking && (
            <IconTextSpace>
              <FontAwesomeIcon icon={faCar} />
            </IconTextSpace>
          )}
          {venueData.meta.breakfast && (
            <IconTextSpace>
              <FontAwesomeIcon icon={faCoffee} />
            </IconTextSpace>
          )}
          {venueData.meta.pets && (
            <IconTextSpace>
              <FontAwesomeIcon icon={faDog} />
            </IconTextSpace>
          )}
        </IconColumn>
        <TextColumn>
          <IconSpace> {venueData.maxGuests}</IconSpace>
          {venueData.meta.wifi && <IconSpace>Wifi</IconSpace>}
          {venueData.meta.parking && <IconSpace>Parking</IconSpace>}
          {venueData.meta.breakfast && <IconSpace>Breakfast</IconSpace>}
          {venueData.meta.pets && <IconSpace>Pets</IconSpace>}
        </TextColumn>
      </Metas>
    </VenueMeta>
  );
}

export default InformationTab;
