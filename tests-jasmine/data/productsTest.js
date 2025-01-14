import { Product, Clothing, Appliance } from "../../data/products.js";

describe("Test suite: Product", () => {
    let product;

    beforeEach(() => {
        product = new Product({
            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            image: "images/products/athletic-cotton-socks-6-pairs.jpg",
            name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
            rating: {
                stars: 4.5,
                count: 87,
            },
            priceCents: 1090,
            keywords: ["socks", "sports", "apparel"],
        });
    });

    it("Has the corret properties", () => {
        expect(product.id).toBe("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
        expect(product.image).toBe(
            "images/products/athletic-cotton-socks-6-pairs.jpg"
        );
        expect(product.name).toBe(
            "Black and Gray Athletic Cotton Socks - 6 Pairs"
        );
        expect(product.rating).toEqual({
            stars: 4.5,
            count: 87,
        });
        expect(product.rating.count).toBe(87);
        expect(product.priceCents).toBe(1090);
        expect(product.keywords).toEqual(["socks", "sports", "apparel"]);
    });

    it("Gets the correct stars url", () => {
        expect(product.getStarsUrl()).toBe("images/ratings/rating-45.png");
    });

    it("Gets the correct price", () => {
        expect(product.getPrice()).toBe("$10.90");
    });

    it("Gets the correct extra info HTML", () => {
        expect(product.extraInfoHTML()).toBe("");
    });
});

describe("Test suite: Clothing", () => {
    let clothing;

    beforeEach(() => {
        clothing = new Clothing({
            id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
            image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
            name: "Adults Plain Cotton T-Shirt - 2 Pack",
            rating: {
                stars: 4.5,
                count: 56,
            },
            priceCents: 799,
            keywords: ["tshirts", "apparel", "mens"],
            type: "clothing",
            sizeChartLink: "images/clothing-size-chart.png",
        });
    });

    it("Has the correct properties", () => {
        expect(clothing.id).toBe("83d4ca15-0f35-48f5-b7a3-1ea210004f2e");
        expect(clothing.image).toBe(
            "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg"
        );
        expect(clothing.name).toBe("Adults Plain Cotton T-Shirt - 2 Pack");
        expect(clothing.rating).toEqual({
            stars: 4.5,
            count: 56,
        });
        expect(clothing.priceCents).toBe(799);
        expect(clothing.keywords).toEqual(["tshirts", "apparel", "mens"]);
        expect(clothing.type).toBe("clothing");
        expect(clothing.sizeChartLink).toBe("images/clothing-size-chart.png");
    });

    it("Gets the correct stars url", () => {
        expect(clothing.getStarsUrl()).toBe("images/ratings/rating-45.png");
    });

    it("Gets the correct price", () => {
        expect(clothing.getPrice()).toBe("$7.99");
    });

    it("Gets the correct extra info HTML", () => {
        expect(clothing.extraInfoHTML()).toContain(
            `<a href="images/clothing-size-chart.png" target="_blank">Size chart</a>`
        );
    });
});

describe("Test suite: Appliance", () => {
    let appliance;

    beforeEach(() => {
        appliance = new Appliance({
            id: "54e0eccd-8f36-462b-b68a-8182611d9add",
            image: "images/products/black-2-slot-toaster.jpg",
            name: "2 Slot Toaster - Black",
            rating: {
                stars: 5,
                count: 2197,
            },
            priceCents: 1899,
            keywords: ["toaster", "kitchen", "appliances"],
            type: "appliance",
            instructionsLink: "images/appliance-instructions.png",
            warrantyLink: "images/appliance-warranty.png",
        });
    });

    it("Has the correct properties", () => {
        expect(appliance.id).toBe("54e0eccd-8f36-462b-b68a-8182611d9add");
        expect(appliance.image).toBe(
            "images/products/black-2-slot-toaster.jpg"
        );
        expect(appliance.name).toBe("2 Slot Toaster - Black");
        expect(appliance.rating).toEqual({
            stars: 5,
            count: 2197,
        });
        expect(appliance.priceCents).toBe(1899);
        expect(appliance.keywords).toEqual([
            "toaster",
            "kitchen",
            "appliances",
        ]);
        expect(appliance.type).toBe("appliance");
        expect(appliance.instructionsLink).toBe(
            "images/appliance-instructions.png"
        );
        expect(appliance.warrantyLink).toBe("images/appliance-warranty.png");
    });

    it("Gets the correct stars url", () => {
        expect(appliance.getStarsUrl()).toBe("images/ratings/rating-50.png");
    });

    it("Gets the correct price", () => {
        expect(appliance.getPrice()).toBe("$18.99");
    });

    it("Gets the correct extra info HTML", () => {
        expect(appliance.extraInfoHTML())
            .toContain(`<a href="images/appliance-instructions.png" target="_blank">Instructions</a>
            <a href="images/appliance-warranty.png" target="_blank">Warranty</a>`);
    });
});

