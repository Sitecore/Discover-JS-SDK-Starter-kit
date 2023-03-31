import React from 'react';
import { Link } from 'react-router-dom';
import getProductUrl from '../../helpers/getProductUrl';
import { useWishlist } from '../../hooks/wishlist';

const WishlistView = () => {
  const { wishlist, clearWishlist } = useWishlist();

  return (
    <>
      <div className="bg-secondary border-top p-4 text-white mb-3">
        <h1 className="display-6">Wishlist</h1>
      </div>
      <div className="container mb-3">
        {wishlist.length > 0 ? (
          <div className="row">
            <div className="col-md-12 mb-3">
              <button className="btn btn-primary" onClick={() => clearWishlist()}>
                Clear Wishlist
              </button>
            </div>
            <div className="col-md-12">
              <ul className="list-group">
                {wishlist.map((p) => (
                  <li className="list-group-item" key={`item-${p.data.sku}`}>
                    <div className="media d-flex">
                      <img src={p.data.image_url} className="mr-3" width="80" alt={p.data.name} />
                      <div className="media-body ms-3">
                        <Link to={getProductUrl(p.data)} className="mt-0 text-decoration-none">
                          <h5 className="mt-0">{p.data.name}</h5>
                        </Link>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <>
            <p className="display-6">Your wishlist is empty</p>
          </>
        )}
      </div>
    </>
  );
};

export default WishlistView;
