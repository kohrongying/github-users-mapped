import React from 'react';
import { Grommet, WorldMap, Select, Main, Heading, Text, Anchor } from 'grommet';
import COUNTRIES from "../constants/countries.json";
import axios from "axios";
import Popup from "./Popup";

const theme = {
  global: {
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px',
    },
  },
};

function App() {
  const [location, setLocation] = React.useState("")
  const [users, setUsers] = React.useState([])
  const [numUsers, setNumUsers] = React.useState(0)
  const [countries, setCountries] = React.useState(COUNTRIES)
  const [show, setShow] = React.useState(false)

  const getGithubUsers = (countryName) => {
    axios.get(`https://api.github.com/search/users?q=location:${countryName}&sort=followers`)
      .then(response => {
        setUsers(response.data.items.slice(0,10))
        setNumUsers(response.data.total_count)
      })
  }

  const onChange = (event) => {
    setLocation(event.option)
    getGithubUsers(event.option.name)
  }

  const onSearch = (searchText) => {
    const regexp = new RegExp(searchText, 'i');
    setCountries(COUNTRIES.filter(o => o.name.match(regexp)));
  }

  return (
    <Grommet theme={theme}>
      <Main pad={"medium"}>
        <Heading level={2} textAlign="center">Find Github Users</Heading>
        <WorldMap
          color={location ? "light-6" : "dark-6"}
          fill="horizontal"
          places={location ? [
            {
              name: location.name,
              location: location.latlng,
              color: 'status-ok',
              onClick: () => setShow(true)
            }
          ] : []}
        />

        <Select
          options={countries}
          placeholder={"Choose a country"}
          value={location}
          labelKey={"name"}
          valueKey={"latlng"}
          onChange={onChange}
          onSearch={onSearch}
          dropHeight={"medium"}
        />

        {show && (
          <Popup
            users={users}
            numUsers={numUsers}
            setShow={setShow}
            locationName={location.name}
          />
        )}

        <Text textAlign="center" margin="large">
          {`Built by `}
          <Anchor href="https://rongying.co" label="Rong Ying" />
          {` with `} 
          <Anchor href="https://v2.grommet.io/" label="Grommet" />
        </Text>
      </Main>
    </Grommet>
  );
}

export default App;