import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import fire from "../fire";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import Fab from "@material-ui/core/Fab";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import CurrentUser from "./CurrentUser";
import { useHistory } from "react-router-dom";
import GridMenu from './Menu';
const useStyles = makeStyles((theme) => ({
  menu: {
    "& svg": {
      fontSize: 40,
    },
  },
  paper: {
    height: "100px",
    width: "100px",
  },
  media: {
    height: "100px",
  },
  avatar: {
    width: "140px",
    height: "140px",
    margin: "20px",
  },
  nameCard: {
    display: "flex",
    alignItems: "center",
    justifyContent: "left",
    height: "200px",
    width: "600px",
  },
  nameCardPos: {
    marginTop: "200px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  ImgList: {
    position: "relative",
    marginTop: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  gridList: {
    transform: `translate(-30px, 0px)`,
    width: 600,
    height: 400,
  },
  addPhoto: {
    transform: `translate(-50px, -170px)`,
  },
  subBlocks: {
    position: "relative,",
  },
  editPhoto: {
    position: "absolute",
  },
  deletePhoto: {
    position: "absolute",
  },
}));

function Interface() {
  const history = useHistory();
  const [image, setImage] = useState();
  const [profileUrl, setProfileUrl] = useState("");
  const [imageLinks, setImageLinks] = useState([]);

  const handleSetLinks = () => {
    CurrentUser.getImageLink().then((links) => {

      setImageLinks(links);
    });
    CurrentUser.getProfileLink().then((link) => {
      setProfileUrl(link);
    });
  };
  const handleSetProfile = (url) => {

    setProfileUrl(url);
    CurrentUser.setProfileLink(url);

    

  }

  const handleSignOut = () => {
    fire
      .auth()
      .signOut()
      .then(() => {
        history.push("/");
      });
  };
  const indent = [];

  let pr = useStyles().paper;
  for (let i = 1; i < 7; i++) {
    indent.push(<Card className={pr} elevation={5} />);
  }

  const handleChange = (e) => {
    if (e.target.files[0] != null) {
      const uploadT = fire
        .storage()
        .ref(fire.auth().currentUser.uid + "/" + e.target.files[0].name)
        .put(e.target.files[0]);
      uploadT.on(
        "state_changed",
        (snapshot) => {},
        (error) => {},
        () => {
          uploadT.snapshot.ref.getDownloadURL().then((u) => {
            var arrayU = [];
            arrayU.push({
              url: u,
              index: imageLinks.length,
            });
            arrayU = imageLinks.concat(arrayU);
            setImageLinks(arrayU);

            CurrentUser.setImageLink(arrayU);
            setImage(null);
          });
        }
      );
    }

  };

  useEffect(() => {
    if (
      fire.auth().currentUser &&
      fire.firestore().collection("UserData").doc(fire.auth().uid)
    ) {
      handleSetLinks();
    }
  }, []);
  return (
    <div className={useStyles().menu}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            className={useStyles().menu}
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1, fontSize: "30px" }}>
            Profile Pictures Repository
          </Typography>
          <Button
            color="inherit"
            style={{ fontSize: "30px" }}
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>

      <div className={useStyles().nameCardPos}>
        <Card className={useStyles().nameCard} elevation={6}>
          <Avatar
            className={useStyles().avatar}
            alt="Remy Sharp"
            src={profileUrl}
          />
        </Card>
      </div>

      <div className={useStyles().ImgList}>
        <Fab color="primary" className={useStyles().addPhoto} component="label">
          <input
            onChange={handleChange}
            type="file"
            accept="image/*"
            id="cameraInput"
            hidden
          />
          <AddAPhotoIcon />
        </Fab>

        <GridList cellHeight={130} className={useStyles().gridList} cols={3} >
          {imageLinks.map((tile) => (
            <GridListTile cols={tile.cols || 1} key={tile.url} id = {tile.url} >
              <img src={tile.url} alt = "ok"/>
              <GridListTileBar  
                style={{ marginBottom: "83px" }}
                actionIcon={
                  <IconButton >
                    

                    <GridMenu url = {tile.url} handleChange = {handleChange} handleSetProfile = {handleSetProfile}/>


                    
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    </div>
  );
}

export default Interface;
/*<input
          onChange={handleChange}
          type="file"
          accept="image/*"
          id="cameraInput"
        />
        <button onClick = {handleUpload}> Upload</button>*/
/*<Card className={useStyles().paper} elevation={5}>
          <CardMedia
            className={useStyles().media}
            image = {url}
            title="Paella dish"
          />
        </Card>*/


      /*  <Menu key = {tile.url + '1'}
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}>
                      
                      <SetP imageU = {tile.url}/>
                      
                      
                      <MenuItem
                        aria-label="More"
                        aria-owns="long-menu"
                        aria-haspopup="true"
                        onClick={handleClose}
                        variant="contained"
                        component="label"
                      >
                        Upload New
                        <input
                          onChange={handleChange}
                          type="file"
                          accept="image/*"
                          id="cameraInput"
                          hidden
                        />
                      </MenuItem>
                      <MenuItem onClick={handleClose}>Remove</MenuItem>
                    </Menu>*/