import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { connect } from 'react-redux'
import {nickProvided } from '../../actions/actions'

class WelcomeDialog extends Component {

    state = {
        open: true,
        nick: '',
    }

    onButtonClicked = () => {
        this.setState({ open: false })
        this.props.onNickProvided(this.state.nick)
    }

    handleChange = (event) => {
        this.setState({ nick: event.target.value })
    }

    render() {
        return (
            <Dialog
                open={this.state.open}
                aria-labelledby="form-dialog-title"
                disableBackdropClick={true}
                disableEscapeKeyDown={true}
            >
                <DialogTitle id="form-dialog-title">Welcome to video chat!</DialogTitle>
                <DialogContent>
                    <DialogContentText>To enter chat please type Your nick</DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nick"
                        fullWidth
                        required
                        value={this.state.nick}
                        onChange={this.handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.onButtonClicked} color="primary">Enter Chat</Button>
                </DialogActions>
            </Dialog>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onNickProvided: userNick => dispatch(nickProvided(userNick))
    }
}

export default connect(null, mapDispatchToProps)(WelcomeDialog)