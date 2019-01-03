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
import { Delete, FourK } from "@material-ui/icons";
import SvgIcon from "@material-ui/core/SvgIcon";
import { red, blue } from "@material-ui/core/colors";

// import DeleteForeverTwoToneIcon from "@material-ui/icons/DeleteForeverTwoTone";

const style = {
  Paper: {
    padding: 20,
    marginTop: 10,
    marginBottom: 10,
    height: 500,
    overflowY: "auto"
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
  exercises,
  category,
  onSelect,
  exercise: {
    id,
    title = "Welcome!",
    description = "Please select an exercise"
  },
  onDelete
}) => (
  <Grid container>
    <Grid item sm>
      <Paper style={style.Paper}>
        {exercises.map(([group, exercises]) =>
          !category || category === group ? (
            <React.Fragment key={group}>
              <Typography variant="h6" style={{ textTransform: "capitalize" }}>
                {group}
              </Typography>
              <List component="ul">
                {exercises.map(({ id, title }) => (
                  <ListItem onClick={() => onSelect(id)} key={id} button>
                    <ListItemText primary={title} />
                    <ListItemSecondaryAction>
                      <IconButton onClick={() => onDelete(id)}>
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
    </Grid>
    <Grid item sm>
      <Paper style={style.Paper}>
        <Typography variant="h4">{title}</Typography>
        <Typography variant="subtitle1" style={{ marginTop: 20 }}>
          {description}
        </Typography>
      </Paper>
    </Grid>
  </Grid>
);
