/* Cargar las noticias de noticias.json y noticias.xml */
function loadNewsJson() {
  $.getJSON( "../data/news.json", function( data ) {
    
      $.each( data, function( key, val ) {
        var title;
        var imgUrl;
        var descripcion;
        for(k in val){
          if(k == "titulo"){
            title = val[k];
          }
          else if(k == "imagen"){
            imgUrl = val[k];
          }
          else if(k == "descripcion"){
            descripcion = val[k];
          }
        }
        addNew(title, imgUrl, descripcion);
      });
  });
}

function addNew(titulo, imgUrl, descripcion) {

  var title = $("<h5/>", {
    html: titulo
  })

  var p = $("<p/>",{
    html: descripcion
  })

  var principalRoot = $( "<div/>", {
    "class": "col-md-4"
  });

  var secundaryRoot = $( "<div/>", {
    "class": "card"
  });

  var img = $("<img/>",{
    "class":"card-img-top",
    "id":"newImg"
  });
  img.attr('alt', imgUrl);
  img.attr('src', imgUrl);
    

  secundaryRoot.appendTo(principalRoot);
  title.appendTo(secundaryRoot);
  img.appendTo(secundaryRoot);
  p.appendTo(secundaryRoot);
  principalRoot.appendTo("#noticiasSemired");

}


function generateChart(){

  // https://insights.stackoverflow.com/survey/2018/#technology-most-loved-dreaded-and-wanted-languages
    const sample = [
      {
        language: '2013',
        value: 38,
        color: '#000000'
      },
      {
        language: '2014',
        value: 41,
        color: '#00a2ee'
      },
      {
        language: '2015',
        value: 48,
        color: '#fbcb39'
      },
      {
        language: '2016',
        value: 62,
        color: '#007bc8'
      },
      {
        language: '2017',
        value: 77,
        color: '#65cedb'
      },
      {
        language: '2018',
        value: 91,
        color: '#ff6e52'
      }
    ];

    const svg = d3.select('svg');
    const svgContainer = d3.select('#containerGraph');
    
    const margin = 80;
    const width = 1000 - 2 * margin;
    const height = 600 - 2 * margin;

    const chart = svg.append('g')
      .attr('transform', `translate(${margin}, ${margin})`);

    const xScale = d3.scaleBand()
      .range([0, width])
      .domain(sample.map((s) => s.language))
      .padding(0.4)
    
    const yScale = d3.scaleLinear()
      .range([height, 0])
      .domain([0, 100]);

    const makeYLines = () => d3.axisLeft()
      .scale(yScale)

    chart.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));

    chart.append('g')
      .call(d3.axisLeft(yScale));


    chart.append('g')
      .attr('class', 'grid')
      .call(makeYLines()
        .tickSize(-width, 0, 0)
        .tickFormat('')
      )

    const barGroups = chart.selectAll()
      .data(sample)
      .enter()
      .append('g')

    barGroups
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (g) => xScale(g.language))
      .attr('y', (g) => yScale(g.value))
      .attr('height', (g) => height - yScale(g.value))
      .attr('width', xScale.bandwidth())
      .on('mouseenter', function (actual, i) {
        d3.selectAll('.value')
          .attr('opacity', 0)

        d3.select(this)
          .transition()
          .duration(300)
          .attr('opacity', 0.6)
          .attr('x', (a) => xScale(a.language) - 5)
          .attr('width', xScale.bandwidth() + 10)

        const y = yScale(actual.value)

        line = chart.append('line')
          .attr('id', 'limit')
          .attr('x1', 0)
          .attr('y1', y)
          .attr('x2', width)
          .attr('y2', y)

        barGroups.append('text')
          .attr('class', 'divergence')
          .attr('x', (a) => xScale(a.language) + xScale.bandwidth() / 2)
          .attr('y', (a) => yScale(a.value) + 30)
          .attr('fill', 'white')
          .attr('text-anchor', 'middle')
          .text((a, idx) => {
            const divergence = (a.value - actual.value).toFixed(1)
            
            let text = ''
            if (divergence > 0) text += '+'
            text += `${divergence}%`

            return idx !== i ? text : '';
          })

      })
      .on('mouseleave', function () {
        d3.selectAll('.value')
          .attr('opacity', 1)

        d3.select(this)
          .transition()
          .duration(300)
          .attr('opacity', 1)
          .attr('x', (a) => xScale(a.language))
          .attr('width', xScale.bandwidth())

        chart.selectAll('#limit').remove()
        chart.selectAll('.divergence').remove()
      })

    barGroups 
      .append('text')
      .attr('class', 'value')
      .attr('x', (a) => xScale(a.language) + xScale.bandwidth() / 2)
      .attr('y', (a) => yScale(a.value) + 30)
      .attr('text-anchor', 'middle')
      .text((a) => `${a.value}%`)
    
    svg
      .append('text')
      .attr('class', 'label')
      .attr('x', -(height / 2) - margin)
      .attr('y', margin / 2.4)
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .text('Estudiantes')

    svg.append('text')
      .attr('class', 'label')
      .attr('x', width / 2 + margin)
      .attr('y', height + margin * 1.7)
      .attr('text-anchor', 'middle')
      .text('Año')

    svg.append('text')
      .attr('class', 'title')
      .attr('x', width / 2 + margin)
      .attr('y', 40)
      .attr('text-anchor', 'middle')
      .text('Estudiantes Registrados en SEMIRED')

    svg.append('text')
      .attr('class', 'source')
      .attr('x', width - margin / 2)
      .attr('y', height + margin * 1.7)
      .attr('text-anchor', 'start')
      .text('Source: Stack Overflow, 2018')
}

loadNewsJson();
generateChart();

