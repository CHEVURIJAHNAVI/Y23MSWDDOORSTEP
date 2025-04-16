import React, { useEffect, useState } from "react";
import axios from "axios"; // Import axios
import { Container, Grid, Card, CardContent, CardMedia, Typography, Button } from "@mui/material";

function APIProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch products using Axios
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <Typography variant="h5">Loading products...</Typography>;
  }

  return (
    <Container maxWidth="xl" style={{ marginTop: "20px" }}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        style={{ fontWeight: "bold", marginBottom: "24px" }}
      >
        Featured Products
      </Typography>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Card style={{ height: "100%", display: "flex", flexDirection: "column" }}>
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.title}
                style={{ objectFit: "contain", padding: "10px" }}
              />
              <CardContent style={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {product.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {product.description.substring(0, 60)}...
                </Typography>
                <Typography variant="h6" color="primary" style={{ marginTop: "10px" }}>
                  ${product.price.toFixed(2)}
                </Typography>
              </CardContent>
              <Button
                variant="contained"
                color="primary"
                style={{ margin: "10px",backgroundColor:"#02075D"}}
                onClick={() => alert(`Added ${product.title} to cart!`)}
              >
                Add to Cart
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default APIProducts;
