import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./css/main.css";
import StudentCard from "./components/studentCard";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentsLoaded: false,
      tagsLoaded: false,
      studentsArray: [],
      tagsOnStudentArray: [],
      nameSearchParameter: "",
      tagSearchParameter: "",
    };
  }

  componentDidMount = () => {
    let x = this;
    //typical fetch call, set state to true for rendering once data receiveed
    fetch("https://www.hatchways.io/api/assessment/students")
      .then((res) => res.json())
      .then((data) => {
        x.setState({ studentsLoaded: true, studentsArray: data });
      })
      .then(function () {
        //build array of ids with a tag array to lift the state up from child component (student card)
        //can then pass down the specific object that matches id of student which will hold current tags
        let tempStudentTagArray = [];
        x.state.studentsArray.students.forEach((e) => {
          let tagObj = {
            id: e.id,
            tags: [],
          };
          tempStudentTagArray.push(tagObj);
        });
        x.setState({
          tagsOnStudentArray: tempStudentTagArray,
          tagsLoaded: true,
        });
      })
      .catch((err) => console.log(err));
  };

  handleNameSearchParameterChange = (e) => {
    this.setState({ nameSearchParameter: e.target.value });
  };

  handleTagSearchParameterChange = (e) => {
    this.setState({ tagSearchParameter: e.target.value });
  };

  //function to pass to child to update tag array state in this component
  //ideally tags would be include in the data source,
  //updating the tags there and having them trickle down
  addTagToTagsOnStudentArray = (id, tag) => {
    let tempStudentTagArray = [...this.state.tagsOnStudentArray];
    let updatedTagObj = tempStudentTagArray[id - 1];
    updatedTagObj.tags.push(tag);
    tempStudentTagArray[id - 1] = updatedTagObj;
    this.setState({ tagsOnStudentArray: tempStudentTagArray });
  };

  //determines how to load the student cards
  renderScene = () => {
    //render loading message if data isn't loaded
    if (!this.state.studentsLoaded || !this.state.tagsLoaded) {
      return (
        <div className="row">
          <div className="col">
            <h1 className="display-1">Loading ...</h1>
          </div>
        </div>
      );
      //condition to filter students based on tag and name parameter
    } else if (this.state.studentsLoaded && this.state.tagsLoaded) {
      if (this.state.nameSearchParameter && this.state.tagSearchParameter) {
        let filteredStudentsByName = [];
        let filteredStudentIDsByTag = [];
        this.state.studentsArray.students.forEach((e) => {
          if (
            e.firstName
              .toUpperCase()
              .includes(this.state.nameSearchParameter.toUpperCase()) ||
            e.lastName
              .toUpperCase()
              .includes(this.state.nameSearchParameter.toUpperCase())
          )
            filteredStudentsByName.push(e);
        });

        this.state.tagsOnStudentArray.forEach((e) => {
          e.tags.forEach((tag) => {
            if (
              tag
                .toUpperCase()
                .includes(this.state.tagSearchParameter.toUpperCase())
            )
              filteredStudentIDsByTag.push(e.id);
          });
        });

        let filteredStudents = filteredStudentsByName.filter((e) =>
          filteredStudentIDsByTag.includes(e.id)
        );

        return filteredStudents.map((e) => (
          <StudentCard
            key={e.id}
            studentCity={e.city}
            studentCompany={e.company}
            studentEmail={e.email}
            studentFName={e.firstName}
            studentGrades={e.grades}
            studentID={e.id}
            studentLName={e.lastName}
            studentPic={e.pic}
            studentSkill={e.skill}
            studentTags={this.state.tagsOnStudentArray.find(
              (x) => x.id === e.id
            )}
            addTag={this.addTagToTagsOnStudentArray}
          />
        ));
        //filter students on only name parameter
      } else if (this.state.nameSearchParameter) {
        let filteredStudents = [];
        this.state.studentsArray.students.forEach((e) => {
          if (
            e.firstName
              .toUpperCase()
              .includes(this.state.nameSearchParameter.toUpperCase()) ||
            e.lastName
              .toUpperCase()
              .includes(this.state.nameSearchParameter.toUpperCase())
          )
            filteredStudents.push(e);
        });
        return filteredStudents.map((e) => (
          <StudentCard
            key={e.id}
            studentCity={e.city}
            studentCompany={e.company}
            studentEmail={e.email}
            studentFName={e.firstName}
            studentGrades={e.grades}
            studentID={e.id}
            studentLName={e.lastName}
            studentPic={e.pic}
            studentSkill={e.skill}
            studentTags={this.state.tagsOnStudentArray.find(
              (x) => x.id === e.id
            )}
            addTag={this.addTagToTagsOnStudentArray}
          />
        ));
        //filter students on only tag parameter
      } else if (this.state.tagSearchParameter) {
        let filteredStudentIDs = [];
        this.state.tagsOnStudentArray.forEach((e) => {
          e.tags.forEach((tag) => {
            if (
              tag
                .toUpperCase()
                .includes(this.state.tagSearchParameter.toUpperCase())
            )
              filteredStudentIDs.push(e.id);
          });
        });

        let filteredStudents = this.state.studentsArray.students.filter((e) =>
          filteredStudentIDs.includes(e.id)
        );

        return filteredStudents.map((e) => (
          <StudentCard
            key={e.id}
            studentCity={e.city}
            studentCompany={e.company}
            studentEmail={e.email}
            studentFName={e.firstName}
            studentGrades={e.grades}
            studentID={e.id}
            studentLName={e.lastName}
            studentPic={e.pic}
            studentSkill={e.skill}
            studentTags={this.state.tagsOnStudentArray.find(
              (x) => x.id === e.id
            )}
            addTag={this.addTagToTagsOnStudentArray}
          />
        ));
      }

      //default, no parameters so return all students
      return this.state.studentsArray.students.map((e) => (
        <StudentCard
          key={e.id}
          studentCity={e.city}
          studentCompany={e.company}
          studentEmail={e.email}
          studentFName={e.firstName}
          studentGrades={e.grades}
          studentID={e.id}
          studentLName={e.lastName}
          studentPic={e.pic}
          studentSkill={e.skill}
          studentTags={this.state.tagsOnStudentArray.find((x) => x.id === e.id)}
          addTag={this.addTagToTagsOnStudentArray}
        />
      ));
    }
  };

  render() {
    return (
      <div className="container-fluid bg-light min-vh-100 d-flex align-items-center">
        <div className="container d-flex justify-content-center">
          <div className="row contentContainer shadow">
            <div className="col">
              {/* in a bigger app I would build a container component for the cards to handle all the options and be more scalable*/}
              <div className="row">
                <div className="col">
                  <input
                    className="form-control textInput text-muted my-3"
                    id="name-input"
                    type="text"
                    placeholder="Search by name"
                    aria-label="Search By Name"
                    value={this.state.nameSearchParameter}
                    onChange={this.handleNameSearchParameterChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <input
                    className="form-control textInput text-muted mb-3"
                    id="tag-input"
                    type="text"
                    placeholder="Search by tags"
                    aria-label="Search By Tags"
                    value={this.state.tagSearchParameter}
                    onChange={this.handleTagSearchParameterChange}
                  />
                </div>
              </div>
              {this.renderScene()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
