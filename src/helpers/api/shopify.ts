const domain = process.env.SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN;

async function ShopifyData(query: string) {
    if (!domain) return
    const URL = `https://${domain}/api/2022-10/graphql.json`;

    const options: any = {
        endpoint: URL,
        method: "POST",
        headers: {
            "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
    };

    try {
        const data = await fetch(URL, options).then((response) => {
            return response.json();
        });

        return data;
    } catch (error) {
        // throw new Error(error);
        console.log(error)
    }
}

export async function getProductsInCollection() {
    const query = `
    {
        collection(handle: "frontpage") {
            title
            products(first: 25) {
                edges {
                    node {
                        id
                        title
                        handle
                        tags
                        priceRange {
                            minVariantPrice {
                                amount
                            }
                        }
                        images(first: 5) {
                            edges {
                                node {
                                    url
                                    altText
                                }
                            }
                        }
                    }
                }
            }
        }
    }`;
  
    const response = await ShopifyData(query);
  
    const allProducts = response.data.collection.products.edges
      ? response.data.collection.products.edges
      : [];
  
    return allProducts;
}

export async function getProduct(handle: string) {
    const query = `
    {
        product(handle: "${handle}") {
            collections(first: 1) {
                edges {
                node {
                products(first: 5) {
                    edges {
                    node {
                        priceRange {
                        minVariantPrice {
                            amount
                        }
                        }
                        handle
                        title
                        id
                        images(first: 5) {
                        edges {
                            node {
                            url
                            altText
                            }
                        }
                        }
                    }
                    }
                }
                }
            }
            }
            id
            title
            handle
            description
            images(first: 5) {
            edges {
                node {
                url
                altText
                }
            }
            }
            options {
            name
            values
            id
            }
            variants(first: 25) {
            edges {
                node {
                selectedOptions {
                    name
                    value
                }
                image {
                    url
                    altText
                }
                title
                id
                availableForSale
                priceV2 {
                    amount
                }
                }
            }
            }
        }
    }`;
  
    const response = await ShopifyData(query);
  
    const product = response.data.product
      ? response.data.product
      : [];
  
    return product;
}
  

export async function createProduct(id: string, quantity: number) {
    const query = `
      mutation {
        checkoutCreate(input: {
          lineItems: [{ variantId: "${id}", quantity: ${quantity}}]
        }) {
          checkout {
            id
            webUrl
          }
        }
      }`;
  
    const response = await ShopifyData(query);
  
    const checkout = response.data.checkoutCreate.checkout
      ? response.data.checkoutCreate.checkout
      : [];
  
    return checkout;
  }

export async function createOrder(id: any, quantity: any) {
    const query = `
        mutation {
            orderCreate(input: {
                lineItems: [{ variantId: , quantity: 1}]
            }) {
                checkout {
                    id
                    webUrl
                }
            }
        }
    `;
  
    const response = await ShopifyData(query);
  
    const checkout = response.data.checkoutCreate.checkout
      ? response.data.checkoutCreate.checkout
      : [];
  
    return checkout;
}

