import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAvailHeight } from "../../../hooks/hooks";
import { useHistory } from "react-router-dom";

import Path from "../../../routes/Path";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";

import ScreenContainer from "../../shared/ScreenContainer";
import InboxActionBar from "../containers/InboxActionBar";
import InvoiceCard from "../containers/InvoiceCard";

import { httpGetInvoicesByClientId } from "../../../store/actions/clientsAction";

const ClientHome = () => {
  const history = useHistory();
  const availHeight = useAvailHeight();
  const dispatch = useDispatch();

  const getedClientInvoices = useSelector((state) => state.clients.getedClientInvoices);

  const useStyles = makeStyles((theme) => ({
    invoicesListContainer: {
      paddingTop: theme.spacing(2),
    },
  }));
  const classes = useStyles();

  useEffect(() => {
    const getInvoicesByClientId = async (clientId) => {
      await dispatch(httpGetInvoicesByClientId(clientId));
    };
    const client = { id: "0520490835" };
    getInvoicesByClientId(client.id);
  }, []);

  const actionHandler = (invoice) => {
    const startPath = pathHandler(invoice);
    if (startPath) {
      navigateHandler(startPath + invoice._id);
    } else history.replace(Path.clients.home);
  };

  


  const pathHandler = (invoice) => {
    switch (invoice.status.code) {
      case status.waiting_1.code: {
        return status.waiting_1.path;
      }
      case status.draft_2.code: {
        return status.draft_2.path;
      }
      case status.needsCorrection_3.code: {
        return status.needsCorrection_3.path;
      }
      case status.active_4.code: {
        return status.active_4.path;
      }
      case status.inactive_5.code: {
        return status.inactive_5.path;
      }

      default: {
        return;
      }
    }
  };

  const status = {
    waiting_1: { code: "wa", path: Path.clients.reviewInvoice },
    draft_2: { code: "dr", path: Path.clients.draftInvoic },
    needsCorrection_3: { code: "ne", path: Path.clients.editInvoice },
    active_4: { code: "ac", path: Path.clients.viewActiveInvoice },
    inactive_5: { code: "in", path: Path.clients.viewInactiveInvoice },
  };

  const path = {
    newInvoice: Path.clients.newInvoice,
  };

  const navigateHandler = (path) => {
    history.push(path);
  };

  return (
    <>
      <ScreenContainer>
        <InboxActionBar
          navigateAction={() => navigateHandler(path.newInvoice)}
        />
        <Grid
          container
          spacing={2}
          direction="column"
          className={classes.invoicesListContainer}
        >
          {getedClientInvoices.map((invoice) => (
            <Grid item key={invoice._id}>
              <InvoiceCard
                invoice={invoice}
                navigateAction={() => actionHandler(invoice)}
              />
            </Grid>
          ))}
        </Grid>
      </ScreenContainer>
    </>
  );
};

export default ClientHome;
