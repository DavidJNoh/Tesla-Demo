import React from "react";
import {
  Grid,
  Paper,
  Typography,
  List,
  ListItemText,
  ListItem,
  ListItemSecondaryAction,
  IconButton
} from "@material-ui/core";
import { Star, Delete, FourK, Edit } from "@material-ui/icons";
import SvgIcon from "@material-ui/core/SvgIcon";
import { red, blue } from "@material-ui/core/colors";
import Form from "./Form";
import ThreeScene from "./Three/ThreeScene";
import ThreeForm from "./Dialogs/ThreeForm";

// import DeleteForeverTwoToneIcon from "@material-ui/icons/DeleteForeverTwoTone";

const style = {
  paper: {
    padding: 20,
    marginTop: 5,
    height: 500,
    overflowY: "auto"
  },
  icon: {
    padding: 0,
    marginBottom: 6
  }
};

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

export default ({
  muscles,
  exercises,
  category,
  editMode,
  onSelect,
  exercise,
  exercise: {
    id,
    title = "Welcome!",
    description = "Please select an exercise"
  },
  onDelete,
  onSelectEdit,
  onEdit,
  threeJS,
  threeEdit
}) => (
  <Grid container>
    <Grid item xs={12} sm={6}>
      <Paper style={style.paper}>
        {exercises.map(([group, exercises]) =>
          !category || category === group ? (
            <React.Fragment key={group}>
              {exercises.length === 0 ? (
                <Typography
                  color="secondary"
                  variant="h6"
                  style={{ textTransform: "capitalize" }}
                >
                  {group}
                </Typography>
              ) : (
                <Typography
                  color="secondary"
                  variant="h6"
                  style={{ textTransform: "capitalize" }}
                >
                  <IconButton style={style.icon} color="primary">
                    <Star />
                  </IconButton>{" "}
                  {group}
                </Typography>
              )}

              {/* {exercises.length === 0 ? "Zero" : "Not Zero"}
              <Typography
                color="secondary"
                variant="h6"
                style={{ textTransform: "capitalize" }}
              >
                {group}
              </Typography> */}

              <List component="ul">
                {exercises.map(({ id, title }) => (
                  <ListItem onClick={() => onSelect(id)} key={id} button>
                    <ListItemText primary={title} />
                    <ListItemSecondaryAction>
                      <IconButton
                        color="primary"
                        onClick={() => onSelectEdit(id)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton color="primary" onClick={() => onDelete(id)}>
                        <Delete />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </React.Fragment>
          ) : null
        )}
        <FourK />
        <HomeIcon />
        <HomeIcon color="primary" />
        <HomeIcon color="secondary" />
        <HomeIcon color="action" />
        <HomeIcon color="error" style={{ fontSize: 30 }} />
        <HomeIcon color="disabled" fontSize="large" />
        <HomeIcon
          color="primary"
          fontSize="large"
          component={svgProps => (
            <svg {...svgProps}>
              <defs>
                <linearGradient id="gradient1">
                  <stop offset="30%" stopColor={blue[400]} />
                  <stop offset="70%" stopColor={red[400]} />
                </linearGradient>
              </defs>
              {React.cloneElement(svgProps.children[0], {
                fill: "url(#gradient1)"
              })}
            </svg>
          )}
        />
      </Paper>
      <ThreeForm threeJS={threeJS} handleThreeEdit={threeEdit} />
    </Grid>
    <Grid item xs={12} sm={6}>
      <Paper style={style.paper}>
        {editMode ? (
          <Form exercise={exercise} muscles={muscles} onSubmit={onEdit} />
        ) : (
          <React.Fragment>
            <Typography color="secondary" variant="h4">
              {title}
            </Typography>
            <Typography variant="subtitle1" style={{ marginTop: 20 }}>
              {description}
            </Typography>
          </React.Fragment>
        )}
      </Paper>
      <ThreeScene threeJS={threeJS} />
    </Grid>
  </Grid>
);
