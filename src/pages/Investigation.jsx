import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EmailIcon from "@mui/icons-material/Email";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  Link,
  Box,
  Button,
  Card,
  Container,
  Fab,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  LinearProgress,
  Popover,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Header from "../components/Dashboard/Header";
import {
  getInvestigation,
  getNodeInfo,
  updateSelectedNodeInfo,
  updateNodeColor,
  selectLoadingRecentTransactions,
  getRecentTransactions,
  resetInvestigationSlice,
  selectLoadingNodeInfo,
  selectNodes,
  selectRecentTransactions,
  selectRelationships,
  selectSelectedEdge,
  selectSelectedNode,
  selectSelectedNodeInfo,
  updateCustomNotes,
  updateSelectedEdge,
  updateSelectedNode,
  uploadNetworkImage,
  selectImageAWSUrl,
  updateRecentTransactions,
} from "../redux/slices/investigationSlice";
import { formatDate, formatTime } from "../utils/formatTime";
import { chains } from "../utils/supportedChains";
import { v4 as uuidv4 } from "uuid";
import { CirclePicker } from "react-color";
import LoadingButton from "@mui/lab/LoadingButton";
import { assetsURL } from "../utils/assetsURL";

export default function Investigation() {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [address, setaddress] = useState(params.address);
  const [chain, setchain] = useState(params.chain);
  const [sharingImageLoading, setsharingImageLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const networkCanvas = useRef("");
  const [nodeIdsInFocus, setNodeIdsInFocus] = useState([]);

  const [recentTrnasactionsExpand, setRecentTrnasactionsExpand] = useState(false);

  const nodes = useSelector(selectNodes);
  const loadingRecentTransactions = useSelector(selectLoadingRecentTransactions);
  const selectedNodeInfo = useSelector(selectSelectedNodeInfo);
  const loadingNodeInfo = useSelector(selectLoadingNodeInfo);
  const recentTransactions = useSelector(selectRecentTransactions);

  const relationships = useSelector(selectRelationships);
  const imageAWSUrl = useSelector(selectImageAWSUrl);
  const selectedNode = useSelector(selectSelectedNode);
  const selectedEdge = useSelector(selectSelectedEdge);
  const network = useRef("");
  const VISNodesDataset = useRef(null);
  const VISEdgesDataset = useRef(null);
  const vis = window.vis;

  const nodeColors = [
    "#f44336",
    "#e91e63",
    "#9c27b0",
    "#673ab7",
    "#3f51b5",

    "#2196f3",
    "#03a9f4",
    "#00bcd4",
    "#009688",
    "#4caf50",

    "#8bc34a",
    "#cddc39",
    "#ffeb3b",
    "#ffc107",
    "#ff9800",

    "#ff5722",
    "#795548",
    "#607d8b",
  ];

  const nodeGroups = {
    "#f44336": {
      borderWidth: 0,
      shape: "dot",
      color: {
        background: "#f44336",
        highlight: "#263238",
        inherit: false,
        opacity: 1.0,
      },
      value: 10,
    },
    "#e91e63": {
      borderWidth: 0,
      shape: "dot",
      color: {
        background: "#e91e63",
        highlight: "#263238",
        inherit: false,
        opacity: 1.0,
      },
      value: 10,
    },
    "#9c27b0": {
      borderWidth: 0,
      shape: "dot",
      color: {
        background: "#9c27b0",
        highlight: "#263238",
        inherit: false,
        opacity: 1.0,
      },
      value: 10,
    },
    "#673ab7": {
      borderWidth: 0,
      shape: "dot",
      color: {
        background: "#673ab7",
        highlight: "#263238",
        inherit: false,
        opacity: 1.0,
      },
      value: 10,
    },
    "#3f51b5": {
      borderWidth: 0,
      shape: "dot",
      color: {
        background: "#3f51b5",
        highlight: "#263238",
        inherit: false,
        opacity: 1.0,
      },
      value: 10,
    },

    "#2196f3": {
      borderWidth: 0,
      shape: "dot",
      color: {
        background: "#2196f3",
        highlight: "#263238",
        inherit: false,
        opacity: 1.0,
      },
      value: 10,
    },
    "#03a9f4": {
      borderWidth: 0,
      shape: "dot",
      color: {
        background: "#03a9f4",
        highlight: "#263238",
        inherit: false,
        opacity: 1.0,
      },
      value: 10,
    },
    "#00bcd4": {
      borderWidth: 0,
      shape: "dot",
      color: {
        background: "#00bcd4",
        highlight: "#263238",
        inherit: false,
        opacity: 1.0,
      },
      value: 10,
    },
    "#009688": {
      borderWidth: 0,
      shape: "dot",
      color: {
        background: "#009688",
        highlight: "#263238",
        inherit: false,
        opacity: 1.0,
      },
      value: 10,
    },
    "#4caf50": {
      borderWidth: 0,
      shape: "dot",
      color: {
        background: "#4caf50",
        highlight: "#263238",
        inherit: false,
        opacity: 1.0,
      },
      value: 10,
    },

    "#8bc34a": {
      borderWidth: 0,
      shape: "dot",
      color: {
        background: "#8bc34a",
        highlight: "#263238",
        inherit: false,
        opacity: 1.0,
      },
      value: 10,
    },
    "#cddc39": {
      borderWidth: 0,
      shape: "dot",
      color: {
        background: "#cddc39",
        highlight: "#263238",
        inherit: false,
        opacity: 1.0,
      },
      value: 10,
    },
    "#ffeb3b": {
      borderWidth: 0,
      shape: "dot",
      color: {
        background: "#ffeb3b",
        highlight: "#263238",
        inherit: false,
        opacity: 1.0,
      },
      value: 10,
    },
    "#ffc107": {
      borderWidth: 0,
      shape: "dot",
      color: {
        background: "#ffc107",
        highlight: "#263238",
        inherit: false,
        opacity: 1.0,
      },
      value: 10,
    },
    "#ff9800": {
      borderWidth: 0,
      shape: "dot",
      color: {
        background: "#ff9800",
        highlight: "#263238",
        inherit: false,
        opacity: 1.0,
      },
      value: 10,
    },

    "#ff5722": {
      borderWidth: 0,
      shape: "dot",
      color: {
        background: "#ff5722",
        highlight: "#263238",
        inherit: false,
        opacity: 1.0,
      },
      value: 10,
    },
    "#795548": {
      borderWidth: 0,
      shape: "dot",
      color: {
        background: "#795548",
        highlight: "#263238",
        inherit: false,
        opacity: 1.0,
      },
      value: 10,
    },
    "#607d8b": {
      borderWidth: 0,
      shape: "dot",
      color: {
        background: "#607d8b",
        highlight: "#263238",
        inherit: false,
        opacity: 1.0,
      },
      value: 10,
    },

    "crypto-exchange": {
      borderWidth: 0,
      shape: "circularImage",
      image: `${assetsURL}crypto-exchange/crypto-exchange.jpg`,
      color: {
        background: "#607d8b",
        highlight: "#263238",
        inherit: false,
        opacity: 1.0,
      },
      value: 10,
    },
  };

  var doubleClick = false;

  const init = async () => {
    setLoading(true);
    await dispatch(getInvestigation({ address, chain, id: params.id, do: "replace", load_complete_graph: true }));
    setLoading(false);
  };

  useEffect(() => {
    init();

    return () => {
      dispatch(resetInvestigationSlice());
    };
  }, []);

  useEffect(() => {
    if (VISNodesDataset.current && VISEdgesDataset.current) {
      update(nodes, relationships);
    }
  }, [nodes, relationships]);

  const processNodes = (nodes) => {
    const nodesArr = [];
    nodes.map((node) => {
      if (VISNodesDataset.current !== null && VISNodesDataset.current.get(node.id) === null) {
        nodesArr.push({
          id: node.id,
          uid: node.uid,
          address: node.address,
          label: node.address.slice(0, 8),
          custom_note: node.custom_note,
          group: node.group,
          is_exchange: node.is_exchange,
        });
      }
    });
    return nodesArr;
  };
  const getVISNodesDataset = (nodes) => {
    return new vis.DataSet(processNodes(nodes));
  };

  const processEdge = (edges) => {
    const relationshipsArr = [];
    edges.map((edge) => {
      if (VISEdgesDataset.current !== null && VISEdgesDataset.current.get(edge.id) === null) {
        relationshipsArr.push({
          from: edge.from.id,
          to: edge.to.id,
          to_node: edge.to,
          from_node: edge.from,
          hashValue: edge.hashValue,
          timeStamp: edge.timeStamp,
          transaction_value: edge.value,
          blockNumber: edge.blockNumber,
          arrows: "to",
          width: 1,
          id: edge.id,
          color: {
            color: "#B0BEC5",
            highlight: "#607D8B",
            inherit: false,
            opacity: 1.0,
          },
        });
      }
    });
    return relationshipsArr;
  };
  const getVISRelationshipsDataset = (relationships) => {
    return new vis.DataSet(processEdge(relationships));
  };

  const update = (nodes, edges) => {
    if (VISNodesDataset.current && VISEdgesDataset.current) {
      VISNodesDataset.current.add(processNodes(nodes));
      VISEdgesDataset.current.add(processEdge(edges));
    }
  };

  useEffect(() => {
    var container = document.getElementById("mynetwork");

    if (container) {
      VISNodesDataset.current = getVISNodesDataset(nodes);
      VISEdgesDataset.current = getVISRelationshipsDataset(relationships);

      // create a network
      var data = {
        nodes: VISNodesDataset.current,
        edges: VISEdgesDataset.current,
      };
      const netWorkHeight = document.documentElement.clientHeight - 210;
      var options = {
        clickToUse: true,
        height: netWorkHeight + "px",
        edges: {
          smooth: {
            enabled: true,
            roundness: 0.13,
            forceDirection: false,
          },
        },
        nodes: {
          scaling: {
            min: 8,
            max: 16,
          },
        },
        physics: {
          solver: "forceAtlas2Based",
          stabilization: { iterations: 200 },
          minVelocity: 5,
          maxVelocity: 5,
        },
        groups: nodeGroups,
      };

      network.current = new vis.Network(container, data, options);

      network.current.on("doubleClick", function (properties) {


        dispatch(updateSelectedEdge(null));

        doubleClick = true;
        var nodeids = properties.nodes;
        var edgeids = properties.edges;

        if (nodeids.length > 0) {
          var clickedNodes = VISNodesDataset.current.get(nodeids);
          dispatch(
            getInvestigation({
              address: clickedNodes[0].address,
              chain,
              id: params.id,
              do: "append",
              load_complete_graph: false,
            })
          );
        } else {
          var clickedEdges = VISEdgesDataset.current.get(edgeids);
        }
      });

      network.current.on("click", function (properties) {
        if (properties.event.tapCount === 1) {
          setTimeout(function () {
            if (doubleClick == false) {
              dispatch(updateSelectedEdge(null));
              dispatch(updateSelectedNode(null));
              dispatch(updateSelectedNodeInfo(null));
              dispatch(updateRecentTransactions([]));
             

              var nodeids = properties.nodes;
              var edgeids = properties.edges;

              if (nodeids.length > 0) {
                var clickedNodes = VISNodesDataset.current.get(nodeids);
                dispatch(updateSelectedNode(clickedNodes[0]));
                dispatch(getNodeInfo({ id: params.id, uid: clickedNodes[0].uid }));
                dispatch(getRecentTransactions({ id: params.id, uid: clickedNodes[0].uid }));

                // Empty previous nodes in foucs
                setNodeIdsInFocus([]);
                let tempNodesInFocus = [];

                // Add selected node in nodes in focus
                tempNodesInFocus.push(clickedNodes[0].id);

                // Added connceted node ids to nodes in focus
                var connectedEdges = VISEdgesDataset.current.get(edgeids);
                connectedEdges.map((edge) => {
                  tempNodesInFocus.push(edge.from);
                  tempNodesInFocus.push(edge.to);
                });

                // update nodes in focus
                setNodeIdsInFocus(tempNodesInFocus);
              } else {
                var clickedEdges = VISEdgesDataset.current.get(edgeids);
                dispatch(updateSelectedEdge(clickedEdges[0]));
              }

              if (nodeids.length == 0 && edgeids.length == 0) {
                setNodeIdsInFocus([]);
              }
            } else {
              doubleClick = false;
            }
          }, 400);
        }
      });

      network.current.on("afterDrawing", function (ctx) {
        networkCanvas.current = ctx.canvas;
      });
    }
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Header selectedMenu={0} />

      {loading && (
        <Container>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "80vh" }}>
            <Typography variant="body1" p={3}>
              Fetching investigation data
            </Typography>
            <LinearProgress sx={{ minWidth: "6rem" }} />
          </Box>
        </Container>
      )}

      <Container maxWidth="80vw" sx={{ marginTop: 5, paddingBottom: 5, maxWidth: "80vw", display: !loading ? "bloack" : "none" }}>
        <canvas id="viewport" style={{ display: "none", height: 1000, width: 1000 }}></canvas>

        <Box sx={{ display: "flex", alignItems: "center", marginBottom: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <Fab
              color="text.secondary"
              sx={{ borderRadius: 1, boxShadow: "none", marginRight: 1 }}
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              <KeyboardBackspaceIcon />
            </Fab>

            <TextField
              disabled={true}
              sx={{ minWidth: "30rem", marginRight: 1 }}
              placeholder="Address"
              value={address}
              onChange={(e) => {
                setaddress(e.target.value);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ opacity: 0.5 }} />
                  </InputAdornment>
                ),
              }}
            />

            <Select
              disabled={true}
              value={chain}
              sx={{ minWidth: "14rem" }}
              onChange={(e) => {
                setchain(e.target.value);
              }}
            >
              {chains.map((chainData) => {
                return (
                  <MenuItem value={chainData.name} key={uuidv4()}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box
                        component="img"
                        sx={{
                          marginRight: 1,
                          height: 24,
                          width: 24,
                          maxHeight: 24,
                          maxWidth: 24,
                        }}
                        alt="ethereum"
                        src={chainData.logo}
                      />
                      {chainData.name}
                    </Box>
                  </MenuItem>
                );
              })}
            </Select>
          </Box>

          <Box>
            <LoadingButton
              startIcon={<GridViewRoundedIcon />}
              variant="outlined"
              size="large"
              loading={sharingImageLoading}
              onClick={(e) => {
                dispatch(
                  uploadNetworkImage({
                    setsharingImageLoading: setsharingImageLoading,
                    id: params.id,
                    canvas: networkCanvas.current,
                  })
                );
                handleClick(e);
              }}
            >
              Export as JPG
            </LoadingButton>

            <Popover
              id={id}
              open={open && imageAWSUrl !== ""}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              {sharingImageLoading && (
                <Box sx={{ minWidth: "15rem" }}>
                  <LinearProgress />
                </Box>
              )}

              {!sharingImageLoading && (
                <Box sx={{ minWidth: "30rem", maxWidth: "30rem", padding: 3, whiteSpace: "pre-wrap", overflowWrap: "break-word" }}>
                  <Grid container>
                    <Grid item xs={11}>
                      <Typography variant="caption">
                        <Link href={imageAWSUrl}>{imageAWSUrl}</Link>
                      </Typography>
                    </Grid>
                    <Grid item xs={1} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <IconButton
                        onClick={() => {
                          navigator.clipboard.writeText(imageAWSUrl);
                        }}
                      >
                        <ContentCopyIcon sx={{ color: "text.secondary", maxWidth: "1rem" }} />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </Popover>
          </Box>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Box
              p={2}
              sx={{
                border: "solid",
                borderWidth: 1,
                borderRadius: 1,
                borderColor: "#d6d6d6",
                marginBottom: 2,
              }}
            >
              <Typography variant="h6">Investigation {params.number}</Typography>
            </Box>

            <Box
              p={2}
              className="customScrollBarLight"
              sx={{ border: "solid", borderWidth: 1, borderRadius: 1, borderColor: "#d6d6d6", maxHeight: "60vh", overflowY: "auto" }}
            >
              {nodeIdsInFocus.length > 0 &&
                nodes.map((nodeData) => {
                  if (nodeIdsInFocus.includes(nodeData.id)) {
                    return (
                      <Box mb={2} mt={1} key={uuidv4()}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Typography variant="subtitle2" color="text.secondary" sx={{ marginRight: 1 }}>
                            Investigation {params.number}
                          </Typography>

                          {nodeData.notifications_enabled && <NotificationsIcon sx={{ color: "green", maxWidth: "1rem" }} />}
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", whiteSpace: "pre-wrap", overflowWrap: "break-word" }}>
                          <Box sx={{ maxWidth: "90%" }}>
                            <Typography variant="caption" sx={{ fontSize: "0.7rem", fontWeight: "bold", marginRight: 1 }}>
                              {nodeData.address}
                            </Typography>
                          </Box>

                          <IconButton
                            onClick={() => {
                              navigator.clipboard.writeText(nodeData.address);
                            }}
                          >
                            <ContentCopyIcon sx={{ color: "text.secondary", maxWidth: "1rem" }} />
                          </IconButton>
                        </Box>
                      </Box>
                    );
                  }
                })}

              {nodeIdsInFocus.length == 0 &&
                nodes.map((nodeData) => {
                  return (
                    <Box mb={2} mt={1} key={uuidv4()}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="subtitle2" color="text.secondary" sx={{ marginRight: 1 }}>
                          Investigation {params.number}
                        </Typography>

                        {nodeData.notifications_enabled && <NotificationsIcon sx={{ color: "green", maxWidth: "1rem" }} />}
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", whiteSpace: "pre-wrap", overflowWrap: "break-word" }}>
                        <Box sx={{ maxWidth: "90%" }}>
                          <Typography variant="caption" sx={{ fontSize: "0.7rem", fontWeight: "bold", marginRight: 1 }}>
                            {nodeData.address}
                          </Typography>
                        </Box>

                        <IconButton
                          onClick={() => {
                            navigator.clipboard.writeText(nodeData.address);
                          }}
                        >
                          <ContentCopyIcon sx={{ color: "text.secondary", maxWidth: "1rem" }} />
                        </IconButton>
                      </Box>
                    </Box>
                  );
                })}
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Box
              fullWidth
              sx={{
                border: "solid",
                borderWidth: 1,
                borderRadius: 1,
                borderColor: "#d6d6d6",
                minWidth: "100%",
                minHeight: "calc(100vh - 13rem)",
                maxHeight: "calc(100vh - 13rem)",
              }}
            >
              <div id="mynetwork"></div>
            </Box>
          </Grid>

          <Grid item xs={3}>
            {selectedEdge == null && (
              <Stack spacing={2}>
                {/* Address details */}
                <Box p={2} sx={{ border: "solid", borderWidth: 1, borderRadius: 1, borderColor: "#d6d6d6" }}>
                  <Stack spacing={2}>
                    <Box>
                      <Box sx={{ display: "flex" }}>
                        <Typography variant="h6" sx={{ marginRight: 1 }}>
                          Node
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", whiteSpace: "pre-wrap", overflowWrap: "break-word" }}>
                        <Box sx={{ maxWidth: "90%" }}>
                          <Typography variant="body2" sx={{ marginRight: 2, color: "text.secondary" }}>
                            {selectedNode?.address ? selectedNode.address : "--------------------------------------"}
                          </Typography>
                        </Box>

                        <IconButton
                          onClick={() => {
                            navigator.clipboard.writeText(selectedNode?.address);
                          }}
                        >
                          <ContentCopyIcon sx={{ color: "text.secondary", maxWidth: "1rem" }} />
                        </IconButton>
                      </Box>
                    </Box>

                    {!recentTrnasactionsExpand && (
                      <>
                        <Box>
                          <Typography variant="body1" sx={{ color: "text.secondary" }}>
                            Balance
                          </Typography>
                          {loadingNodeInfo ? (
                            <Box pt={1} pb={1} pr={3}>
                              <LinearProgress pt={1} />
                            </Box>
                          ) : (
                            <Typography variant="h6">{selectedNodeInfo?.balance ? selectedNodeInfo?.balance : "-------"}</Typography>
                          )}
                        </Box>

                        <Box>
                          <Grid container>
                            <Grid item xs={6}>
                              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                                First Txn:
                              </Typography>
                              {loadingNodeInfo ? (
                                <Box pt={1} pb={1} pr={3}>
                                  <LinearProgress />
                                </Box>
                              ) : (
                                <Typography variant="h6">
                                  {selectedNodeInfo?.first_txn_on ? formatDate(selectedNodeInfo?.first_txn_on) : "--/--/----"}
                                </Typography>
                              )}
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                                Last Txn:
                              </Typography>
                              {loadingNodeInfo ? (
                                <Box pt={1} pb={1} pr={3}>
                                  <LinearProgress pt={1} />
                                </Box>
                              ) : (
                                <Typography variant="h6">
                                  {selectedNodeInfo?.last_txn_on ? formatDate(selectedNodeInfo?.last_txn_on) : "--/--/----"}
                                </Typography>
                              )}
                            </Grid>
                          </Grid>
                        </Box>
                      </>
                    )}
                  </Stack>
                </Box>

                {/* Volume */}
                {!recentTrnasactionsExpand && (
                  <>
                    <Box sx={{ border: "solid", borderWidth: 1, borderRadius: 1, borderColor: "#d6d6d6" }}>
                      <Accordion sx={{ backgroundColor: "white" }} defaultExpanded={false}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography>
                            Other Token Balances {selectedNodeInfo?.balances ? `(${selectedNodeInfo?.balances?.length})` : "(0)"}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          {loadingNodeInfo ? (
                            <Box pt={1} pb={1} pr={3}>
                              <LinearProgress pt={1} />
                            </Box>
                          ) : (
                            <Grid container spacing={2}>
                              {!selectedNodeInfo?.balances && (
                                <Box pl={2}>
                                  <Typography variant="h6">------</Typography>
                                </Box>
                              )}

                              {selectedNodeInfo?.balances?.length == 0 && (
                                <Box pl={2}>
                                  <Typography variant="body2">No Tokens Found</Typography>
                                </Box>
                              )}

                              {selectedNodeInfo?.balances.map((balanceData) => {
                                return (
                                  <Grid item xs={6}>
                                    <Typography
                                      variant="body1"
                                      sx={{ fontWeight: "bold", color: "text.secondary", whiteSpace: "pre-wrap", overflowWrap: "break-word" }}
                                    >
                                      {balanceData["symbol"]}
                                    </Typography>
                                    <Typography variant="body2" sx={{ whiteSpace: "pre-wrap", overflowWrap: "break-word" }}>
                                      {balanceData["balance"]}
                                    </Typography>
                                  </Grid>
                                );
                              })}
                            </Grid>
                          )}
                        </AccordionDetails>
                      </Accordion>
                    </Box>
                  </>
                )}

                {/* Recent transaction */}
                <Box sx={{ border: "solid", borderWidth: 1, borderRadius: 1, borderColor: "#d6d6d6" }}>
                  <Accordion sx={{ backgroundColor: "white" }} expanded={recentTrnasactionsExpand}>
                    <AccordionSummary
                      expandIcon={
                        <ExpandMoreIcon
                          onClick={() => {
                            setRecentTrnasactionsExpand(!recentTrnasactionsExpand);
                          }}
                        />
                      }
                    >
                      <Typography>View recent transaction {recentTransactions && `(${recentTransactions?.length})`}</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ padding: 0 }}>
                      <Box pr={2} pl={2} pb={2} pt={1} sx={{ maxHeight: "50vh", overflowY: "auto" }} className="customScrollBarLight">
                        {loadingRecentTransactions && (
                          <Box>
                            <LinearProgress />
                          </Box>
                        )}
                        {recentTransactions.map((txn) => {
                          return (
                            <Box pb={2} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }} key={uuidv4()}>
                              <Box sx={{ minWidth: "10%", maxWidth: "20%" }}>
                                <Typography variant="caption">{formatDate(txn.timeStamp)}</Typography>
                              </Box>

                              <Box sx={{ flexGrow: 1, maxWidth: "55%", whiteSpace: "pre-wrap", overflowWrap: "break-word" }}>
                                <Typography variant="caption">{txn.value}</Typography>
                              </Box>

                              <Box>
                                {txn.from === selectedNode?.address ? (
                                  <Box sx={{ backgroundColor: "#FFC700", borderRadius: 0.3, minWidth: "3rem" }} pr={1} pl={1} textAlign="center">
                                    <Typography sx={{ color: "#c29700", fontWeight: "bold" }} variant="caption">
                                      OUT
                                    </Typography>
                                  </Box>
                                ) : (
                                  <Box sx={{ backgroundColor: "#a6ffaf", borderRadius: 0.3, minWidth: "3rem" }} pr={1} pl={1} textAlign="center">
                                    <Typography sx={{ color: "#16ba27", fontWeight: "bold" }} variant="caption">
                                      IN
                                    </Typography>
                                  </Box>
                                )}
                              </Box>
                            </Box>
                          );
                        })}
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                </Box>

                {/* Color picker */}
                {!recentTrnasactionsExpand && selectedNode && selectedNode.is_exchange === false && (
                  <Box p={2} sx={{ border: "solid", borderWidth: 1, borderRadius: 1, borderColor: "#d6d6d6" }}>
                    <Typography variant="body1" sx={{ color: "text.secondary", marginBottom: 1 }}>
                      Node Color :
                    </Typography>

                    <CirclePicker
                      width="100%"
                      colors={nodeColors}
                      color={selectedNode.group}
                      circleSize={24}
                      onChangeComplete={(e) => {
                        dispatch(
                          updateNodeColor({
                            id: params.id,
                            uid: selectedNode.uid,
                            color: e.hex,
                          })
                        );

                        let temp = { ...selectedNode };
                        temp.group = e.hex;
                        VISNodesDataset.current.update(temp);
                      }}
                    />
                  </Box>
                )}

                {/* Custom note */}
                {!recentTrnasactionsExpand && selectedNode && (
                  <Box p={2} sx={{ border: "solid", borderWidth: 1, borderRadius: 1, borderColor: "#d6d6d6" }}>
                    <Typography variant="body1" sx={{ color: "text.secondary" }}>
                      Custom Notes :
                    </Typography>

                    <Input
                      fullWidth
                      value={selectedNodeInfo?.custom_note ? selectedNodeInfo?.custom_note : ""}
                      disableUnderline
                      multiline
                      onChange={(event) => {
                        dispatch(
                          updateCustomNotes({
                            id: params.id,
                            uid: selectedNode.uid,
                            custom_note: event.target.value,
                          })
                        );

                        let temp = { ...selectedNode };
                        temp.custom_note = event.target.value;
                        VISNodesDataset.current.update(temp);
                      }}
                      placeholder="Add a Custom Note"
                    />
                  </Box>
                )}
              </Stack>
            )}

            {selectedEdge && (
              <Stack spacing={2}>
                {/* Address details */}
                <Box p={2} sx={{ border: "solid", borderWidth: 1, borderRadius: 1, borderColor: "#d6d6d6" }}>
                  <Stack spacing={2}>
                    <Box>
                      <Box sx={{ display: "flex" }}>
                        <Typography variant="h6" sx={{ marginRight: 1 }}>
                          Transaction
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", whiteSpace: "pre-wrap", overflowWrap: "break-word" }}>
                        <Box sx={{ maxWidth: "90%" }}>
                          <Typography variant="body2" sx={{ marginRight: 2, color: "text.secondary" }}>
                            {selectedEdge?.hashValue ? selectedEdge.hashValue : "--------------------------------------"}
                          </Typography>
                        </Box>

                        <IconButton
                          onClick={() => {
                            navigator.clipboard.writeText(selectedEdge?.hashValue);
                          }}
                        >
                          <ContentCopyIcon sx={{ color: "text.secondary", maxWidth: "1rem" }} />
                        </IconButton>
                      </Box>
                    </Box>

                    <Box>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Box sx={{ whiteSpace: "pre-wrap", overflowWrap: "break-word" }}>
                            <Typography variant="body1" sx={{ color: "text.secondary" }}>
                              Value
                            </Typography>
                            <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                              {selectedEdge?.transaction_value}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box sx={{ whiteSpace: "pre-wrap", overflowWrap: "break-word" }}>
                            <Typography variant="body1" sx={{ color: "text.secondary" }}>
                              Timestamp
                            </Typography>
                            <Typography variant="caption">
                              {formatDate(new Date(selectedEdge?.timeStamp))} {new Date(selectedEdge?.timeStamp).toLocaleTimeString("en-US")}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>

                    <Box>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Box sx={{ whiteSpace: "pre-wrap", overflowWrap: "break-word" }}>
                            <Typography variant="body1" sx={{ color: "text.secondary" }}>
                              From:
                            </Typography>
                            <Typography variant="caption">{selectedEdge?.from_node.address}</Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box sx={{ whiteSpace: "pre-wrap", overflowWrap: "break-word" }}>
                            <Typography variant="body1" sx={{ color: "text.secondary" }}>
                              To:
                            </Typography>
                            <Typography variant="caption">{selectedEdge?.to_node.address}</Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </Stack>
                </Box>
              </Stack>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
