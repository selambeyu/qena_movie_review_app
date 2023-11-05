import React from "react";
import styled from "styled-components";
import { Stack, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import { Link } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import RoundedSearchInput from "./Search";

const CenteredAppBar = styled(AppBar)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding: 0.5rem;
  background-color: #010080;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const LinkTypography = styled(Typography)`
  text-decoration: none;
  color: white;
  &:hover {
    cursor: pointer;
    color: gray;
  }
`;

const Header = ({
  searchMovie,
  searchText,
  selectedYear,
  handleSearchChange,
  onYearChange,
}) => {
  return (
    <div>
      <CenteredAppBar style={{ backgroundColor: "#010080" }} position="static">
        <Toolbar>
          <Stack
            alignItems="center"
            direction={{ xs: "column", md: "row" }}
            spacing={2}
          >
            <Link to="/" style={{ textDecoration: "none" }}>
              <LinkTypography variant="h6">Movies</LinkTypography>
            </Link>
            <RoundedSearchInput
              searchText={searchText}
              handleSearchChange={handleSearchChange}
              selectedYear={selectedYear}
              onYearChange={onYearChange}
              handleSearch={searchMovie}
            />
            <Link to="/users/new" style={{ textDecoration: "none" }}>
              <LinkTypography variant="h6">Register</LinkTypography>
            </Link>
            <Link to="/movies/new" style={{ textDecoration: "none" }}>
              <LinkTypography variant="h6">Add Movie</LinkTypography>
            </Link>
          </Stack>
        </Toolbar>
      </CenteredAppBar>
    </div>
  );
};

export default Header;
