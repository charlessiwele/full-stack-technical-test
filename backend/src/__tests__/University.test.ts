import { schema } from '../schema';
import { graphql } from 'graphql';


describe('UniversityQuery', () => {
  test('should return a list of universities without args that INCLUDES the given collections sample', async () => {
    const query = `
      query {
        universities {
          name
          state_province
          web_pages
        }
      }
    `;
    
    const result = await graphql(schema, query);
    expect(result.data!.universities).toEqual(expect.arrayContaining(
        [
          {"name": "Cape Peninsula University of Technology", "state_province": "Western Cape Province", "web_pages": ["http://www.cput.ac.za/"]}, {"name": "Central University of Technology", "state_province": "Free State Province", "web_pages": ["http://www.cut.ac.za/"]}, {"name": "Durban University of Technology", "state_province": "KwaZulu-Natal", "web_pages": ["http://www.dut.ac.za/"]}, {"name": "Nelson Mandela University", "state_province": "Eastern Cape Province", "web_pages": ["http://www.mandela.ac.za/", "http://www.nmmu.ac.za/"]},
        ],
      )
    );
  });

  test('should return a list of universities with name arg "Zululand"', async () => {
    const query = `
      query {
        universities(name: "Zululand") {
          name
          state_province
          web_pages
        }
      }
    `;
    const result = await graphql(schema, query);
    expect(result).toEqual({
      data: {
        universities: [
          {
            "name": "University of Zululand",
            "state_province": "KwaZulu-Natal",
            "web_pages": [
              "http://www.unizulu.ac.za/"
            ]
          },
        ],
      },
    });
  });

  test('should return a list of universities with state_province arg "Natal"', async () => {
    const query = `
      query {
        universities(state_province: "Natal") {
          name
          state_province
          web_pages
        }
      }
    `;
    const result = await graphql(schema, query);
    expect(result).toEqual({
      data: {
        universities: [
          {
            "name": "Durban University of Technology",
            "state_province": "KwaZulu-Natal",
            "web_pages": [
              "http://www.dut.ac.za/"
            ]
          },
          {
            "name": "University of KwaZulu-Natal",
            "state_province": "KwaZulu-Natal",
            "web_pages": [
              "http://www.ukzn.ac.za/"
            ]
          },
          {
            "name": "University of Zululand",
            "state_province": "KwaZulu-Natal",
            "web_pages": [
              "http://www.unizulu.ac.za/"
            ]
          },
          {
            "name": "Mangosuthu Univerisity of Technology",
            "state_province": "KwaZulu-Natal",
            "web_pages": [
              "http://www.mut.ac.za/"
            ]
          },
        ],
      },
    });
  });

  test('should return an empty list of universities with invalid args', async () => {
    const query = `
      query {
        universities(name: "Invalid Name", state_province: "Invalid State") {
          name
          state_province
          web_pages
        }
      }
    `;
    const result = await graphql(schema, query);
    expect(result).toEqual({
      data: {
        universities: [],
      },
    });
  });
});
