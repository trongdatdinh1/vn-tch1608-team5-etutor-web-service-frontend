import {API_ON} from '../../constants/ApiOn'

export const avatarProfile = () => {
  if(API_ON) {
    let name = this.props.authentication.user.name;
    return `https://icotar.com/initials/${name}`
  } else {
    return `https://icotar.com/initials/random name`
  }
}

export const otherAvatar = (name) => {
  return `https://icotar.com/initials/${name}`
}
