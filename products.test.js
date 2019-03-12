import SagaTester from "redux-saga-tester";
import api from "../../../services/api";
import rootSaga from "../index";

import MockAdapter from "axios-mock-adapter";

import {
  Types as ProductsTypes,
  Creators as ProductsActions
} from "../../ducks/products";

const apiMock = new MockAdapter(api);

describe("Products saga", () => {
  let sagaTester = null;

  beforeEach(() => {
    sagaTester = new SagaTester({});
    sagaTester.run(rootSaga);
  });

  it("should be able to fetch products from API", async () => {
    const products = [
      {
        id: 1,
        description: "Isotretinoina 400 mg - Maxxi",
        price: 35.9,
        priceWithDiscount: 25.9,
        thumbnail:
          "https://cdn1.staticpanvel.com.br/produtos/15/698060-15.jpg?ims=400x",
        discountPercent: 10,
        qty: 200,
        isActive: 1,
        priority: 1
      }
    ];

    apiMock.onGet("products").reply(200, products);

    sagaTester.dispatch(ProductsActions.getProductsRequest());

    await sagaTester.waitFor(ProductsTypes.GET_SUCCESS);

    expect(sagaTester.getLatestCalledAction()).toEqual(
      ProductsActions.getProductsSuccess(products)
    );
  });
});
