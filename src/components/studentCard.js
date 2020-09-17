import React, { Component } from "react";

//
// Props -
// studentCity: city of student
// studentCompany: company of student
// studentEmail: email of student
// studentFName: first name of student
// studentGrades: array of students grades (ints)
// studentID: db id of student
// studentLName: last name of student
// studentPic: picture student picked/assigned
// studentSkill: student selected skill
// studentTags: object with student ID and array of tags (strings) that the student has
// addTag: function to add a tag to parents state array based on newTagInput
//

class StudentCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayGrades: false,
      newTagInput: "",
    };
  }

  handleDisplayGradesChange = () => {
    this.setState({ displayGrades: !this.state.displayGrades });
  };

  //from the video I assumed this is on enter
  //could easily change this logic to match whatever if it wasn't on enter
  handleNewTagInputChange = (e) => {
    this.setState({ newTagInput: e.target.value });
  };

  handleNewTagSubmit = (e) => {
    if (e.key === "Enter") {
      this.props.addTag(this.props.studentID, this.state.newTagInput);
      this.setState({ newTagInput: "" });
    }
  };

  renderStudentAverage = () => {
    let count = 0;
    let total = 0;

    this.props.studentGrades.forEach((e) => {
      count += 1;
      total += Number(e);
    });

    return <p className="text-muted">Average: {total / count}%</p>;
  };

  renderStudentGrades = () => {
    return this.props.studentGrades.map((e, i) => (
      <div className="row mb-n3" key={i}>
        <div className="col offset-3">
          <p className="pl-4 text-muted">
            Test {i + 1}: <span className="pl-4">{e}</span>%
          </p>
        </div>
      </div>
    ));
  };

  renderTags = () => {
    return this.props.studentTags.tags.map((e) => (
      <div
        className="studentTag mx-1 d-flex flex-column justify-content-center"
        key={e}
      >
        <span className="px-3 py-2 text-dark">{e}</span>
      </div>
    ));
  };

  render() {
    return (
      <div className="row studentCardRow">
        <div className="col mb-3">
          <div className="row">
            <div className="col-3 d-flex justify-content-center pr-2">
              <div className="d-flex align-items-center">
                <img
                  src={this.props.studentPic}
                  alt="new"
                  className="rounded-circle imgDiv"
                />
              </div>
            </div>
            <div className="col-8">
              <div className="row">
                <div className="col">
                  <h1 className="text-uppercase font-weight-bold">
                    {this.props.studentFName + " " + this.props.studentLName}{" "}
                  </h1>
                </div>
              </div>
              <div className="row pl-4 mb-n3">
                <div className="col">
                  <p className="text-muted">Email: {this.props.studentEmail}</p>
                </div>
              </div>
              <div className="row pl-4 mb-n3">
                <div className="col">
                  <p className="text-muted">
                    Company: {this.props.studentCompany}
                  </p>
                </div>
              </div>
              <div className="row pl-4 mb-n3">
                <div className="col">
                  <p className="text-muted">Skill: {this.props.studentSkill}</p>
                </div>
              </div>
              <div className="row pl-4">
                <div className="col">{this.renderStudentAverage()}</div>
              </div>
            </div>
            <div className="col-1">
              {this.state.displayGrades ? (
                <i
                  className="fas fa-minus fa-2x text-secondary pt-2 expand-btn"
                  onClick={this.handleDisplayGradesChange}
                />
              ) : (
                <i
                  className="fas fa-plus fa-2x text-secondary pt-2 expand-btn"
                  onClick={this.handleDisplayGradesChange}
                />
              )}
            </div>
          </div>
          {this.state.displayGrades ? this.renderStudentGrades() : null}
          {this.state.displayGrades ? (
            <div className="row pl-4 mt-3">
              <div className="col offset-3 d-flex justify-content-start">
                {this.renderTags()}
              </div>
            </div>
          ) : null}
          {this.state.displayGrades ? (
            <div className="row pl-4">
              <div className="col offset-3">
                <input
                  className="form-control textInput text-muted my-3 w-25"
                  id="add-tag-input"
                  type="text"
                  placeholder="Add a tag"
                  aria-label="Add A Tag"
                  value={this.state.newTagInput}
                  onChange={this.handleNewTagInputChange}
                  onKeyDown={this.handleNewTagSubmit}
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default StudentCard;
