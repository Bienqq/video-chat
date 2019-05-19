import React from 'react'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice'

import './Buttons.css'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
})

const Buttons = ({classes, onTalkButtonClicked}) => {
  return (
    <div className="buttons">
      <Button variant="contained" color="default" className={classes.button}>
        Send file
        <CloudUploadIcon className={classes.rightIcon} />
      </Button>
      <Button variant="contained" color="default" className={classes.button} onClick={onTalkButtonClicked}>
        <KeyboardVoiceIcon className={classes.leftIcon} />
        Talk
      </Button>
    </div>
  )
}

export default withStyles(styles)(Buttons)