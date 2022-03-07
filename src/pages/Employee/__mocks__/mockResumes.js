// Resume object should have resume field with sectors created based on template selected by admin

export const mockResumes = {
  rid1: {
    projectName: '37th Street SW Storm Trunk Relocation Contract',
    updateDate: '-',
    status: 'Requested',
    action: 'Submit',
    sectors: {
      justification: {},
      education: {
        years: '',
        sections: {},
      },
      summary: {},
      experience: {},
    },
  },
  rid2: {
    projectName: '38th Street SW Storm Trunk Relocation Contract',
    updateDate: '2/6/2022',
    status: 'Submiteed',
    action: 'View',
    sectors: {
      justification: {
        sid1: 'John Doe is a municipal infrastructure engineer in our Calgary office with 19 years utility design and coordination experience. He has keen understanding of local stakeholders, personnel, and processes to successfully expedite utility coordination as they relate to the 5th Avenue Flyover bridge and has established personal contacts with deep and franchise utility companies to facilitate coordination.',
      },
      education: {
        years: '',
        sections: {
          sid3: 'Professional License (Engineering), 2011',
          sid4: 'Civil Engineering Technology, Southern Alberta Institute of Technology, 2001',
        }
      },
      summary: {
        sid5: 'John Doe has an eye for detail and is methodical in his work - assets that will reduce utility surprises and facilitate adherence to schedule.',
      },
      experience: {
        sid7: {
          title: '37th Street SW Storm Trunk Relocation Contract 2',
          location: 'Calgary, AB',
          description: 'Administration during construction of the $13.5M large diameter storm trunk and outfall to Glenmore Resevoir. Provided oversight for reviews of project submissions, requests for information, shop drawings.',
          division: 'Civil',
        },
      },
    },
  },
}

// const rows = [
//   { id: '1', projectName: , updateDate: '-', status: 'Requested', action: 'Submit'},
//   { id: '2', projectName: , updateDate: , status: 'Submiteed', action: 'View'},
//   { id: '3', projectName: '39th Street SW Storm Trunk Relocation Contract', updateDate: '2/4/2022', status: 'Submitted', action: 'View'},

// ];

