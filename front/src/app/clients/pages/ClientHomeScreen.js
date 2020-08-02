import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAvailHeight } from "../../../hooks/hooks";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";

import ScreenContainer from "../../shared/ScreenContainer";
import InboxActionBar from "../containers/InboxActionBar";
import Invoice from "../containers/Invoice";

import { httpGetInvoicesByClientId } from "../../../store/actions/clientsAction";

const ClientHome = () => {
  const history = useHistory();
  const availHeight = useAvailHeight();
  const dispatch = useDispatch();

  const getedInvoices = useSelector((state) => state.clients.getedInvoices);

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

  const path = {
    selectProvinceCity: "/select-province-city",
    invoiceDetail: "/invoice/",
  };

  const navigateHandler = (path) => {
    history.push(path);
  };

  return (
    <>
      <ScreenContainer>
        <InboxActionBar
          navigateAction={() => navigateHandler(path.selectProvinceCity)}
        />
        <Grid
          container
          spacing={2}
          direction="column"
          className={classes.invoicesListContainer}
        >
          {getedInvoices.map((invoice) => (
            <Grid item key={invoice._id}>
              <Invoice
                invoice={invoice}
                navigateAction={() =>
                  navigateHandler(path.invoiceDetail + invoice._id)
                }
              />
            </Grid>
          ))}
        </Grid>
      </ScreenContainer>
    </>
  );
};

export default ClientHome;
