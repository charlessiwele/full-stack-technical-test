import { extendType, objectType, stringArg } from "nexus";
import { NexusGenObjects } from "../schema_gen/nexus-typegen";
import axios from 'axios';


let universitiesResolved: NexusGenObjects["University"][] = []

type University = {
  'name': string,
  'state-province': string,
  'web_pages': string[]
};


async function getUniversityList() {
  try {
    const { data, status } = await axios.get(
      'http://universities.hipolabs.com/search?country=South+Africa',
      {
        headers: {
          Accept: ['application/json', 'html/text']
        },
      },
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error)
      return error;
    } else {
      console.log('unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
}


export const University = objectType({
  name: "University",
  definition(t) {
    t.nonNull.string("name");
    t.nonNull.string("state_province");
    t.list.string('web_pages');
  },
});

export const UniversityQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("universities", {
      type: "University",

      args: {
        name: stringArg(),
        state_province: stringArg(),
      },

      async resolve(parent, args, context, info) {
        universitiesResolved = []
        const results = await getUniversityList()
        await results.map((uni: any) => {
          universitiesResolved.push({
            'name': uni['name'],
            'state_province': uni['state-province'],
            'web_pages': uni['web_pages'],
          })
        })
        if (args != null && args.name) {
          universitiesResolved = await universitiesResolved.filter((item) => ((item.name).toUpperCase().includes(args.name!.toUpperCase())))
        }
        if (args != null && args.state_province) {
          if (universitiesResolved.length > 0) {
            universitiesResolved = await universitiesResolved.filter((item) => (item.state_province.toUpperCase().includes(args.state_province!.toUpperCase())));
          }
        }
        return universitiesResolved;
      },
    });
  },
});

