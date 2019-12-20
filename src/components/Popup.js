import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text, Main, Layer, Button, Grid } from 'grommet';
import UserDetail from "./UserDetail";

const Popup = ({ numUsers, locationName, users, setShow }) => (
  <Layer
      overflow={"scroll"}
      onEsc={() => setShow(false)}
      onClickOutside={() => setShow(false)}
    >
      <Main width="large" overflow={"scroll"}>
        <Box margin={"medium"} align="center" alignContent="center" alignSelf="center" justify="center">
          <h1>{numUsers.toLocaleString()}</h1>
          <Text>
            Total Github Users in {locationName}
          </Text>
        </Box>
        <Grid
          columns={["1/2", "1/2"]}
          margin="small"
        >
          {users.map(user => (
            <UserDetail key={user.id} user={user} />
          ))}

        </Grid>
        <Button margin="small" label="close" onClick={() => setShow(false)} />
      </Main>
  </Layer>
)

Popup.propTypes = {
  numUsers: PropTypes.number,
  users: PropTypes.array,
  setShow: PropTypes.func.isRequired,
  locationName: PropTypes.string,
};

export default Popup;