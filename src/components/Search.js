import React from "react";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import styled from "styled-components";

const SearchContainer = styled("div")`
  display: flex;
  align-items: center;
`;

const SearchField = styled(TextField)`
  flex: 1;
`;

const Divider = styled("div")`
  width: 1px;
  height: 40px; /* Adjust the height as needed */
  background-color: #ccc;
  margin: 0 8px;
`;

const RoundedSearchInput = ({
  searchText,
  handleSearchChange,
  handleSearch,
  selectedYear,
  onYearChange,
}) => {
  return (
    <SearchContainer>
      <SearchField
        placeholder="Search Movies By title and year"
        fullWidth
        variant="outlined"
        value={searchText}
        name="searchText"
        onChange={handleSearchChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <Divider />
              <IconButton onClick={handleSearch}>
                <SearchIcon style={{ cursor: "pointer" }} />
              </IconButton>
            </InputAdornment>
          ),
          sx: {
            backgroundColor: "white",
            borderRadius: "55px",
          },
        }}
      />
    </SearchContainer>
  );
};

export default RoundedSearchInput;
