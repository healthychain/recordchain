import React, { Component } from "react";
import { Button, ProgressBar } from "react-bootstrap";
import Footer from "./Footer"
import "../../node_modules/react-grid-layout/css/styles.css";
import "../../node_modules/react-resizable/css/styles.css";

//Uses a React JS library called react-grid-layout
var ReactGridLayout = require('react-grid-layout');

export default class Grid extends Component {

    //Handles clicking on 'About page' button
    //Redirect to About.js
    handleAbout = async event => {
        event.preventDefault();
        this.props.props.history.push("/about");
    }

    render() {
        //Layout is defined here
        var layout = [
            { i: 'Title', x: 0, y: 0, w: 11.4, h: 2 },
            { i: 'Score Pie', x: 0.5, y: 2, w: 3, h: 3 },
            { i: 'Credit analysis', x: 4, y: 2, w: 7, h: 20 },
            { i: 'Comparison', x: 0.4, y: 2, w: 10.6, h: 2 },
            { i: 'Empty', x: 0, y: 23, w: 25, h: 2 }
        ];
        var score = this.props.score;
        var percentile_score = this.props.percentile_score;
        var monthly_spending = this.props.monthly_spending;
        var late_payments = this.props.late_payments;

        var color = "danger";
        if (score >= 8) {
            color = "success";
        } else if (score >= 6) {
            color = "info";
        } else if (score >= 4) {
            color = "warning";
        }

        //Returns a ReactGridLayout component from react-grid-layout library
        //A score dashboard consists of Title, Score pie (Relative ranking vs population).
        //a credit analysis table (explaining score on different metrics), a progress bar
        //showing the credit score graphically, and a footer with link to the about page.
        return (
            <ReactGridLayout isDraggable={false} isResizable={false} className="layout" layout={layout} cols={12} rowHeight={30} width={1200}>
                <div key="Title">
                    <h1><center>Your credit score is {score}/10.</center></h1>
                </div>
                <div key="Score Pie">
                    &nbsp;<b>Your ranking compared to others</b>
                </div>
                <div key="Credit analysis">
                </div>
                <div key="Comparison">
                    <ProgressBar now={score * 10} bsStyle={color} label={score} />
                </div>
                <div key="Empty"><Footer>
                    <Button bsStyle="link" onClick={this.handleAbout}> Understand your credit score </Button>
                </Footer></div>
            </ReactGridLayout>
        );
    }
}