import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './allvenues.css';
import filter from '../../assets/filter.png';
import Card from 'react-bootstrap/Card';
import { AiFillCar, AiFillStar, AiOutlineUser, AiOutlineWifi } from 'react-icons/ai';
import { apiURL, holidazeVenues } from '../../utils/constants';
import useApi from '../../hooks/useApi';
import { Container, Row, Col } from 'react-bootstrap';
import { MDBInput } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import FilterModal from './components/FilterModal';
import placeholderImg from '../../assets/placeholder.png';
import Favorites from './components/Favorites';
import Loader from '../../components/Loader';
import { MdOutlineEmojiFoodBeverage, MdPets } from 'react-icons/md';

const AllVenues = () => {
  const { dataValues, isLoading, isError } = useApi(apiURL + holidazeVenues + '?_owner=true');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  //Filter states
  const additionalFilterLocation = queryParams.get('location') || '';
  const additionalFilterGuest = queryParams.get('maxGuests') || '';
  const additionalFilterPrice = queryParams.get('maxPrice') || '';
  const [query, setQuery] = useState('');
  const [wifi, setWifi] = useState(false);
  const [parking, setParking] = useState(false);
  const [breakfast, setBreakfast] = useState(false);
  const [pets, setPets] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [guests, setGuests] = useState(0);

   //Filter Modal
   const [show, setShow] = useState(false);
   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

   const [mergedFilteredList, setMergedFilteredList] = useState([]);

   useEffect(() => {
    if (dataValues) {
      const filteredData = dataValues?.filter((items) => {
        // Filter logic based on additional filters
        if (additionalFilterLocation && items.location.country !== additionalFilterLocation) {
          return false;
        }
        if (additionalFilterGuest && items.maxGuests !== parseInt(additionalFilterGuest)) {
          return false;
        }
        if (additionalFilterPrice && (items.price < 0 || items.price > parseInt(additionalFilterPrice))) {
          return false;
        }
        return true;
      });
  
      const mergedList = filteredData.filter((items) => {
        // Filter logic based on modal filters
        if (wifi && !items.meta.wifi) {
          return false;
        }
        if (parking && !items.meta.parking) {
          return false;
        }
        if (breakfast && !items.meta.breakfast) {
          return false;
        }
        if (pets && !items.meta.pets) {
          return false;
        }
        if (query) {
          const queryLower = query.toLowerCase();
          if (
            !items.name?.toLowerCase().includes(queryLower) &&
            !items.owner.name?.toLowerCase().includes(queryLower) &&
            !items.location.city?.toLowerCase().includes(queryLower) &&
            !items.location.country?.toLowerCase().includes(queryLower)
          ) {
            return false;
          }
        }
        if (guests && items.maxGuests < guests) {
          return false;
        }
        if (items.price < minPrice || items.price > maxPrice) {
          return false;
        }
        return true;
      });
  
      setMergedFilteredList(mergedList);
    }
  }, [dataValues, additionalFilterLocation, additionalFilterGuest, additionalFilterPrice, wifi, parking, breakfast, pets, query, guests, minPrice, maxPrice]);
  

  const handleUndoFiltering = () => {
    const newQuery = ``;
    window.location.href=`/allvenues${query}`
  };

  if(isLoading){
    return <Loader />
  }

  if(isError){
    return <h1 className='text-center'>An error had occured</h1>
  } 

  return (
    <>
    <main className='main-padding'>
      <Container className='p-5 mt-5'>
        <div className='adminHeader'>
          <h1 className='adminHeadOne primaryHeader'>Holidaze</h1>
          <h1 className='adminHeadTwo mt-5'>Venues</h1>
        </div>

        <div className='d-flex justify-content-between align-items-center mb-4'>
          <div className='mb-2'>
            <p>Search for products</p>
            <MDBInput
              placeholder='Search'
              type='text'
              className='mt-0'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button className="btn-undo-filtering mt-4" onClick={handleUndoFiltering}>
            Undo Filtering
          </button>

          <button className='btn-filter mt-4' onClick={handleShow}>
          <img src={filter} alt='icon' className='btn-filter-icon' />
          <span className='btn-filter-span'>Filter </span>
        </button>
          <FilterModal
              setWifi={setWifi}
              setParking={setParking}
              setBreakfast={setBreakfast}
              setPets={setPets}
              setMinPrice={setMinPrice}
              setMaxPrice={setMaxPrice}
              setGuests={setGuests}
              show={show}
              handleClose={handleClose}
              wifi={wifi}
              parking={parking}
              breakfast={breakfast}
              pets={pets}
              minPrice={minPrice}
              maxPrice={maxPrice}
              guests={guests}
          />

            </div>
                <Row className='justify-content-center'>
                {mergedFilteredList.length === 0 ? (
                  <div className="text-center">Sorry, no venues found for this filtering.</div>
                    ) : (
                    mergedFilteredList.map((item) =>
                       item.media.map((mediaUrl, idx) => (
                            <Col sm="10" md="6" lg="4" className='md:p-4 sm:p-1 mb-4' key={`${item.id}-${idx}`}>
                                <Card>
                                    <Card.Img 
                                    variant="top" 
                                    src={mediaUrl} 
                                    style={{ height: "220px", objectFit: "cover" }}
                                    onError={(e) => {
                                      e.target.src = placeholderImg;
                                    }} 
                                    />
                                    <Card.Body className='venues-card'>

                                      <Favorites id={item.id} name={item.name} media={mediaUrl}/> 
                                      <Row>
                                        <Col>
                                            <Link to={`/venue/${item.id}`} key={idx} className='venue-title'>
                                              <h5>
                                                      {item.name}
                                              </h5>
                                          </Link>
                                        </Col>
                                   
                                      </Row>     
                                      <div className='d-flex mt-2 justify-content-around'>
                                            {item.meta.wifi && (
                                              <div className="meta-box">
                                                <AiOutlineWifi className='meta-icon'/>
                                                <div className="meta-text">Wifi</div>
                                              </div>
                                            )}
                                            {item.meta.parking && (
                                              <div className="meta-box">
                                                <AiFillCar className='meta-icon'/>
                                                <div className="meta-text">Parking</div>
                                              </div>
                                            )}
                                            {item.meta.breakfast && (
                                              <div className="meta-box">
                                                <MdOutlineEmojiFoodBeverage className='meta-icon'/>
                                                <div className="meta-text">Breakfast</div>
                                              </div>
                                            )}
                                            {item.meta.pets && (
                                              <div className="meta-box">
                                                <MdPets className='meta-icon'/>
                                                <div className="meta-text">Pets</div>
                                              </div>
                                            )}
                                        </div>                             

                                        <div className='d-flex facilities mt-2'>
                                            <div className='venues-faci d-flex'>
                                                <AiOutlineUser className='venues-icon' />
                                                <p>{item.maxGuests}</p>
                                            </div>
                                            <div className='venues-faci d-flex'>
                                                <AiFillStar className='venues-icon' />
                                                <p>{item.rating}</p>
                                            </div>
                                        </div>
                                        <Card.Text className='text-center mt-4'>
                                            {item.price} NOK / night
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ))}
                </Row>
            </Container>
          </main>
        </>
    )
};

export default AllVenues;