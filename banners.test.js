import SagaTester from "redux-saga-tester";
import api from "../../../services/api";
import rootSaga from "../index";

import MockAdapter from "axios-mock-adapter";

import {
  Types as BannersTypes,
  Creators as BannersActions
} from "../../ducks/banners";

const apiMock = new MockAdapter(api);

describe("Banners saga", () => {
  let sagaTester = null;

  beforeEach(() => {
    sagaTester = new SagaTester({});
    sagaTester.run(rootSaga);
  });

  it("should be able to fetch banners from API", async () => {
    const banners = {
      1025: [
        {
          img_url:
            "https://cdn1.staticpanvel.com.br/banners/banner_1362/slide_1640/anthelios_0402.png"
        },
        {
          img_url:
            "https://cdn1.staticpanvel.com.br/banners/banner_1362/slide_1638/dermolovers_3001.jpg"
        },
        {
          img_url:
            "https://cdn1.staticpanvel.com.br/banners/banner_1362/slide_1637/precobaixo2_0402.png"
        }
      ],
      1024: [
        {
          img_url:
            "https://cdn1.staticpanvel.com.br/banners/banner_1362/slide_1640/anthelios_0402_t.png"
        },
        {
          img_url:
            "https://cdn1.staticpanvel.com.br/banners/banner_1362/slide_1638/dermolovers_3001_t.jpg"
        },
        {
          img_url:
            "https://cdn1.staticpanvel.com.br/banners/banner_1362/slide_1637/precobaixo2_0402_t.png"
        }
      ],
      767: [
        {
          img_url:
            "https://cdn1.staticpanvel.com.br/banners/banner_1362/slide_1640/anthelios_0402_m_h.png"
        },
        {
          img_url:
            "https://cdn1.staticpanvel.com.br/banners/banner_1362/slide_1638/dermolovers_3001_m_h.jpg"
        },
        {
          img_url:
            "https://cdn1.staticpanvel.com.br/banners/banner_1362/slide_1637/precobaixo2_0402_m_h.png"
        }
      ],

      480: [
        {
          img_url:
            "https://cdn1.staticpanvel.com.br/banners/banner_1362/slide_1640/anthelios_0402_m.png"
        },
        {
          img_url:
            "https://cdn1.staticpanvel.com.br/banners/banner_1362/slide_1638/dermolovers_3001_m.jpg"
        },
        {
          img_url:
            "https://cdn1.staticpanvel.com.br/banners/banner_1362/slide_1637/precobaixo2_0402_m.png"
        }
      ]
    };

    apiMock.onGet("banners").reply(200, banners);

    sagaTester.dispatch(BannersActions.getBannersRequest());

    await sagaTester.waitFor(BannersTypes.GET_SUCCESS);

    expect(sagaTester.getLatestCalledAction()).toEqual(
      BannersActions.getBannersSuccess(banners)
    );
  });
});
