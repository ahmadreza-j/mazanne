import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment-jalaali";

import InfoIcon from "@material-ui/icons/Info";
import TodayIcon from "@material-ui/icons/Today";
import ScheduleIcon from "@material-ui/icons/Schedule";
import ClassIcon from "@material-ui/icons/Class";
import TimerIcon from "@material-ui/icons/Timer";
import LabelIcon from "@material-ui/icons/Label";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ButtonBase from "@material-ui/core/ButtonBase";
import ScreenContainer from "../../shared/ScreenContainer";
import IconLabel from "../components/ui/IconLabel";

const useStyles = makeStyles((theme) => ({}));

const InvoiceCard = ({ invoice, navigateAction }) => {
  const classes = useStyles();

  const labelRow = () => {
    const start = `شامل ${invoice.items.length} مورد، از قبیل`;
    const end = `و ...`;
    const sentence = (txt) => {
      return start + " " + txt + " " + end;
    };

    if (invoice.items[0].productName) {
      return sentence(invoice.items[0].productName);
    } else if (invoice.items[0].productDesc) {
      return sentence(invoice.items[0].productDesc);
    } else {
      return sentence(invoice.items[0].productImg);
    }
  };

  return (
    <ButtonBase onClick={navigateAction} component={Paper}>
      <Grid container spacing={1}>
        <Grid item>
          <IconLabel label={invoice.status.label} color="skyblue">
            <InfoIcon />
          </IconLabel>
        </Grid>
        <Grid item>
          <IconLabel label={moment(invoice.createdAt).format("jYYYY/jMM/jDD")}>
            <TodayIcon />
          </IconLabel>
        </Grid>
        <Grid item>
          <IconLabel label={moment(invoice.createdAt).format("HH:mm")}>
            <ScheduleIcon />
          </IconLabel>
        </Grid>
        <Grid item>
          <IconLabel
            label={`${invoice.parentField.label} / ${invoice.field.label}`}
          >
            <ClassIcon />
          </IconLabel>
        </Grid>
        <Grid item>
          <IconLabel label={invoice.activityPeriod}>
            <TimerIcon />
          </IconLabel>
        </Grid>
        <Grid item xs={12}>
          <IconLabel label={labelRow()}>
            <LabelIcon />
          </IconLabel>
        </Grid>
      </Grid>
    </ButtonBase>
  );
};

export default InvoiceCard;
