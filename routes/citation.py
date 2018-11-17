from bs4 import BeautifulSoup
import requests
import json

def main():
    p_id = sys.argv[1]
    print(p_id)
    var1 = requests.get("https://scholar.google.co.in/citations?user="+p_id)
    soup = BeautifulSoup(var1.content,"html.parser")
    prop = soup.find(id ="gsc_rsb_st")
    prop = prop.find_all("td")
    data,i = {},0
    while i <(len(prop)):
        data[str(prop[i].text)] = str(prop[i+1].text)
        i+=3
    print json.dumps(data)

if __name__ == '__main__':
    main()