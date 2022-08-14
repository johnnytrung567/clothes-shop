const GoogleMap = () => {
    return (
        <section>
            <iframe
                width='1230'
                height='430'
                frameBorder='0'
                scrolling='no'
                marginHeight='0'
                marginWidth='0'
                id='gmap_canvas'
                src='https://maps.google.com/maps?width=1230&amp;height=430&amp;hl=en&amp;q=720%20A%20Dien%20Bien%20Phu%20Ho%20Chi%20Minh%20City+(Fashion%20Outfit%20Store)&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed'
                className='w-full px-4'
            ></iframe>
            <script
                type='text/javascript'
                src='https://embedmaps.com/google-maps-authorization/script.js?id=1c9abcdad0cf33c6559c5e9748b6cff8eb7dc94d'
            ></script>
        </section>
    )
}
export default GoogleMap
