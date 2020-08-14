import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExploreOutlinedIcon from "@material-ui/icons/ExploreOutlined";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import RestaurantOutlinedIcon from "@material-ui/icons/RestaurantOutlined";
import LocalOfferOutlinedIcon from "@material-ui/icons/LocalOfferOutlined";
import AttachMoneyOutlinedIcon from "@material-ui/icons/AttachMoneyOutlined";
import List from "@material-ui/core/List";
import { Link } from "react-router-dom";
import "./styles.css";

export const mainListItems = (
  <List>
    <div className="side-bar-list">
      <Link to="/">
        <ListItem button>
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Transactions" />
        </ListItem>
      </Link>
      <Link to="Customers">
        <ListItem button>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Customers" />
        </ListItem>
      </Link>
      <Link to="/Deals">
        <ListItem button>
          <ListItemIcon>
            <AttachMoneyOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Deals" />
        </ListItem>
      </Link>
      <Link to="/Locations">
        <ListItem button>
          <ListItemIcon>
            <ExploreOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Locations" />
        </ListItem>
      </Link>
      <Link to="/Chains">
        <ListItem button>
          <ListItemIcon>
            <RestaurantOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Chains" />
        </ListItem>
      </Link>
      <Link to="/LocationDeals">
        <ListItem button>
          <ListItemIcon>
            <LocalOfferOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Location Deals" />
        </ListItem>
      </Link>
    </div>
  </List>
);
