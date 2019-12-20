import React from 'react';
import PropTypes from 'prop-types';
import { Box, Image, Text } from 'grommet';

const UserDetail = ({ user }) => (
  <Box direction="row" elevation="small" margin="small">
    <Box width="xxsmall" height="xxsmall">
      <Image
        fit="contain"
        src={user.avatar_url}
      />
    </Box>
    <Box justify="center" pad="small">
      <Text size="small" truncate={true}>{user.login}</Text>
    </Box>
  </Box>
)

UserDetail.propTypes = {
  user: PropTypes.object
}

export default UserDetail;